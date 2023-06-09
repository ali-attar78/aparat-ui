import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SelectBox from "../SelectBox";
import createCategoryApi from "../../services/GetCategoriesApi/getCategoryListApi";
import createAddCategory from "../../services/AddCategory/addCategory";
import AddCategoryIcon from "@mui/icons-material/Add";
import AddCategoryCancelIcon from "@mui/icons-material/Cancel";
import { ContentPasteSearchOutlined } from "@mui/icons-material";

function CategorySelectBox({ channel, value = null, onChange, ...props }) {
  const categoryApi = createCategoryApi();
  const addCategory = createAddCategory();
  const [options, setOptions] = useState([]);
  const [addNewItem, setAddNewItem] = useState(false);
  const [newCategory, setnewCategory] = useState({});
  const [newItemTitle, setNewItemTitle] = useState("");
  const [currentValue, setCurrentValue] = useState(
    value ? `00${value}` : value,
  );

  const [items, setItems] = useState(
    channel
      ? {
          '0': "افزودن دسته بندی جدید",
          '00': "بدون دسته بندی",
        }
      : {}
  );
 
  async function listCategory() {
    const response = await categoryApi.getCategory("/category");
   
    response.result.forEach((item) => {
      if (!!channel === !!item.user_id) {
        setItems((prevItems) => ({
          ...prevItems,
          [`00${item.id}`]: item.title,
        }));
      }
    });

    // setOptions(items);
  }

  function handleChange(val) {
    if (val === '0') {
      setAddNewItem(true);
    } else {
      if (val === '00') {
        onChange(null);
        setCurrentValue("");
      } else {
        onChange(val.replace(/^00/, ''));
      }
      setCurrentValue(val);
    }
  }

  async function handleAddNewItem() {
    const thisResponse = await addCategory.addCategory(newItemTitle, "/category/create");
    const item = thisResponse.result;
    if (!!channel === !!item.user_id) {
      const newId = `00${parseInt(item.id) + 1}`;
      setItems((prevItems) => ({
        ...prevItems,
        [newId]: item.title,
      }));
      setCurrentValue(newId);
    }
    if (thisResponse) {
      setnewCategory(thisResponse);
    }
    setAddNewItem(false);
    setNewItemTitle("");
  }

  useEffect(() => {
    listCategory();
   
  }, []);

  function handleAddNewItemCancel() {
    setAddNewItem(false);
    setNewItemTitle("");
  }

  return (
    <>
      {addNewItem ? (
        <TextField
          fullWidth
          variant="outlined"
          {...props}
          autoFocus
          label="عنوان دسته بندی جدید"
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value.trim())}
          onKeyDown={e => e.which === 13 && handleAddNewItem()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color="primary"
                  edge="end"
                  disabled={newItemTitle.length < 3}
                  onClick={handleAddNewItem}
                >
                  <AddCategoryIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  edge="end"
                  onClick={handleAddNewItemCancel}
                >
                  <AddCategoryCancelIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <SelectBox
          fullWidth
          variant="outlined"
          {...props}
          options={items}
          value={currentValue || ""}
          onChange={handleChange}
        />
      )}
    </>
  );
}

CategorySelectBox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

export default memo(CategorySelectBox);
