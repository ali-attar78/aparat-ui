import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ErrorMessage from "../../../components/ErrorMessage";
import NoItemInList from "../../../components/NoItemInList";
import { Button, InputBase } from "@mui/material";
import AddOutlined from "@mui/icons-material/AddOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import GetMyCategoryService from "../../../services/GetMyCategoryApi/GetMyCategoryApi";
import AddCategoryService from "../../../services/AddCategory/addCategory";
import EditCategoryService from "../../../services/EditCategoryApi/EditCategoryApi";

const CategoriesTabWrapper = styled.div`
  position: relative;
  background: #fff;
  box-shadow: 0 1px 3px 0px #c2c1c1;
  padding: 2em;
  padding-top: 0;

  > .topBar {
    border-bottom: 1px solid #eee;
    padding: 0.5em 0;
    margin-bottom: 2.5em;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    > .userAvatar {
      width: 36px;
      height: 36px;
      border: 1px solid #ccc;
      background: white;
      padding: 2px;
      border-radius: 100%;
      margin-left: 1em;
    }

    > .channelName {
      > span {
        color: #888;
        font-weight: 500;
      }
    }

    > .addButton {
      border-radius: 15px;
      position: absolute;
      left: 2em;

      .icon {
        font-size: 1.2em;
        margin-left: 0.1em;
        color: #888;
      }
    }
  }

  .addCategoryBox {
    background: #f5f5f9;
    padding: 1em;
    overflow: hidden;
    box-sizing: border-box;
    transition: all 200ms ease;
    height: 120px;

    &.hide {
      height: 0;
      padding-top: 0;
      padding-bottom: 0;
    }

    label {
      font-weight: bold;
    }
  }

  .editCategoryBox {
    background: #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transition: all 300ms ease;

    &.hide {
      opacity: 0;
      right: 50%;
      transform: scale(0, 0);
    }
  }

  .buttonWrapper {
    margin-top: 0.5em;
  }
`;

const CategoryWrapper = styled.div`
  background: #fff;
  color: #000;
  padding: 1.5em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  position: relative;

  :hover {
    background: #eee;
  }

  > .categoryTitle {
    margin: 0;
    padding: 0;
    font-size: 1em;
  }

  > .videoCount {
    margin-right: 0.8em;
    font-size: 0.9em;
    color: #555;
  }

  .editBtn {
    border: 1px solid #ece9e9;
    border-radius: 100%;
    position: absolute;
    left: 1em;
    width: 30px;
    height: 30px;
    padding: 3px;
    background: #fff;
    color: #268bf3;

    :hover {
      border-color: #ccc;
    }
  }
`;

function CategoriesTab({}) {
  let addCategoryBoxRef = null;
  let addCategoryInput = null;
  const GetMyCategoryApi = GetMyCategoryService();
  const AddCategoryApi = AddCategoryService();
  const EditCategoryApi = EditCategoryService();

  const [myCategory, setMyCategory] = useState(null);
  const [errorMyCategory, setErrorMyCategory] = useState(null);

  const [addCategory, setAddCategory] = useState(null);
  const [errorAddCategory, setErrorAddCategory] = useState(null);

  const [editCategory, setEditCategory] = useState(null);
  const [errorEditCategory, setErrorEditCategory] = useState(null);


  async function handleAddCategorySubmitButtonClick() {
    try {
      const response = await AddCategoryApi.addCategory(
        addCategoryInput.value,
        "/category/create"
      );
      if (response.error) {
        console.log(response.error);
        setErrorAddCategory(response.error);
      } else {
        console.log(response.result);
        setAddCategory(response.result);
        addCategoryBoxRef.classList.toggle("hide");
      }
    } catch (error) {
      console.error(error);
    }
  }

  
  async function handleGetMyCategories() {
    try {
      const response = await GetMyCategoryApi.GetMyCategory("/category/my");
      if (response.error) {
        console.log(response.error);
        setErrorMyCategory(response.error);
      } else {
        console.log(response.result);
        setMyCategory(response.result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEditCategory(id, title) {
    try {
      const response = await EditCategoryApi.EditCategory(
        title,
        `/category/${id}`
      );
      if (response.error) {
        console.log(response.error);
        setErrorEditCategory(response.error);
      } else {
        console.log(response.result);
        setEditCategory(response.result);

        const editCategoryBox = document.querySelector(
          `[data-category-id="${id}"]`
        ).parentElement;
        editCategoryBox.classList.add("hide");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleGetMyCategories();
  }, [addCategory, editCategory]);

  function handleAddCategoryButtonClick() {
    addCategoryBoxRef.classList.toggle("hide");
  }

  function handleShowEditCategoryBox(e) {
    e.currentTarget.nextElementSibling.classList.remove("hide");
  }

  function handleHideEditCategoryBox(e) {
    e.currentTarget.parentElement.classList.add("hide");
  }

  function handleEditCategorySubmitButtonClick(e) {
    const id = +e.currentTarget.dataset.categoryId;
    const title =
      e.currentTarget.parentElement.querySelector(".input input").value;

    handleEditCategory(id, title);
  }

  return (
    <CategoriesTabWrapper>
      <div className="topBar">
        <img
          className="userAvatar"
          src={
            JSON.parse(localStorage.getItem("auth")).user.channel.banner
              ? JSON.parse(localStorage.getItem("auth")).user.channel.banner
              : JSON.parse(localStorage.getItem("auth")).user.avatar
          }
          alt="تصویر کاربر"
        />
        <h4 className="channelName">
          {JSON.parse(localStorage.getItem("auth")).user.channel.name}/{" "}
          <span>دسته بندی ها</span>
        </h4>

        <Button
          className="addButton"
          variant="outlined"
          onClick={handleAddCategoryButtonClick}
        >
          <AddOutlined className="icon" />
          افزودن
        </Button>
      </div>

      <div
        className="addCategoryBox hide"
        ref={(el) => {
          addCategoryBoxRef = el;
        }}
      >
        <label htmlFor="category-add-input">
          نام دسته‌بندی جدید را وارد کنید
        </label>

        <InputBase
          className="input"
          id="category-add-input"
          fullWidth
          inputProps={{
            ref: (el) => {
              addCategoryInput = el;
            },
          }}
        />

        <div className="buttonWrapper">
          <Button
            className="btn btn-cancel"
            onClick={handleAddCategoryButtonClick}
          >
            انصراف
          </Button>
          <Button
            className="btn btn-accept"
            onClick={handleAddCategorySubmitButtonClick}
          >
            افزودن
          </Button>
        </div>
      </div>

      {myCategory &&
        myCategory.length &&
        myCategory.map((category) => (
          <CategoryWrapper key={category.id}>
            <h5 className="categoryTitle">{category.title}</h5>
            <div className="videoCount">
              تعداد ویدیو ها ({category.videoCount || 0})
            </div>

            <EditOutlined
              className="editBtn"
              onClick={handleShowEditCategoryBox}
            />

            <div className="editCategoryBox hide">
              <CloseOutlined onClick={handleHideEditCategoryBox} />

              <InputBase className="input" defaultValue={category.title} />

              <Button
                className="btn btn-accept"
                data-category-id={category.id}
                onClick={handleEditCategorySubmitButtonClick}
              >
                ویرایش
              </Button>
            </div>
          </CategoryWrapper>
        ))}

      {!(myCategory && myCategory.length) && (
        <NoItemInList title="هیچ لیستی برای شما وجود ندارد" />
      )}

      {errorAddCategory && (
        <ErrorMessage
          error={errorAddCategory}
          forceMessage="در افزودن دسته بندی خطایی به وجود آمده است"
        />
      )}

      {errorEditCategory && (
        <ErrorMessage
          error={errorEditCategory}
          forceMessage="در ویرایش دسته بندی خطایی به وجود آمده است"
        />
      )}

      {errorMyCategory && (
        <ErrorMessage
          error={errorMyCategory}
          forceMessage="در دریافت لیست دسته بندی ها خطایی به وجود آمده است"
        />
      )}
    </CategoriesTabWrapper>
  );
}

export default memo(CategoriesTab);
