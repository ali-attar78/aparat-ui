import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Grid,
  Tabs,
  Tab,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";

import SelectBox from "../../../components/SelectBox";
import TagSelectBox from "../../../components/TagSelectBox";
import CategorySelectBox from "../../../components/CategorySelectBox";
import PlayListSelectBox from "../../../components/PlayListSelectBox";
import CreateVideoService from "../../../services/AddVideo/addVideo";

const Wrapper = styled.div`
  flex-grow: 1;

  & .formButton {
    min-width: 700px;
  }
 
  & .tabs {
    border-bottom: 1px solid #ddd;

    & .MuiTabs-indicator {
      background-color: #666;
      height: 1px;
    }
  }

  & .tabContent {
    padding: 1rem;
  }
 
  .fsDILh .MuiInputBase-formControl .css-1ar2bnf-MuiSelect-select-MuiInputBase-input-MuiInput-input {
    border: none;
}

.fsDILh .css-1ar2bnf-MuiSelect-select-MuiInputBase-input-MuiInput-input.MuiSelect-select {
  
   padding-top: 3px; 
}


  & .inputWrapper {
    margin-bottom: 1rem;

    & label {
      font-weight: bold;
      padding-bottom: 0.8rem;
      display: inline-block;
    }

    & .input {
      background: #fff;
    }
  }

  & .btn-wrapper {
    text-align: left;

    & .btn {
      margin: 3px;

      &.btn-publish-later {
        background: #bbb;
        color: #fff;

        &:hover {
          background: #f50057;
          color: initial;
        }
      }
    }
  }

  @media (max-width: 730px) {
    & .formButton {
      min-width: 250px;
    }
  }
`;

function FileUploadInfo({ videoUploadId ,BannerUploaded , onVideoData}) {
  let response;
  const addVideoService = CreateVideoService();
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData] = useState({
    video_id: null,
    title: "عنوان ویدیو",
    category: "1",
    info: "این توضیحان هستش",
    tags: [],
    channel_category: null,
    playlist: null,
    banner: null,
    enable_comments: false,
    enable_watermark: false,
  });

  useEffect(() => {
    setData((prevData) => ({ ...prevData, video_id: videoUploadId }));
  }, [videoUploadId]);

  useEffect(() => {
    if (BannerUploaded) {
      setData((prevData) => ({ ...prevData, banner: BannerUploaded }));
    }
  }, [BannerUploaded]);


  function changeData(key, value) {
    setData({ ...data, [key]: value });
  }

  async function handlePublish() {
  try {
    const response = await addVideoService.addVideo(data, "/video");
    onVideoData(response.result.data);
  } catch (error) {
    console.error(error);
  }
}

  function handlePublishLater() {
    // TODO این قسمت هنوز انجام نشده
    // eslint-disable-next-line no-alert
    alert("handle publish later");
  }

  return (
    <Wrapper>
      <Tabs
        value={selectedTab}
        onChange={(e, tabIndex) => {
          setSelectedTab(tabIndex);
        }}
        indicatorColor="primary"
        textColor="primary"
        className="tabs"
      >
        <Tab label="مشخصات ویدیو" />
        <Tab label="تنظیمات پیشرفته" />
      </Tabs>

      <Grid container>
        {selectedTab === 0 && (
          <Grid container spacing={2} className="tabContent">
            <Grid item xs={12} sm={6} className="inputWrapper">
              <TextField
                fullWidth
                id="inp-title"
                className="input"
                variant="outlined"
                label="عنوان ویدیو"
                defaultValue={data.title}
                onChange={(e) => changeData("title", e.target.value.trim())}
              />
            </Grid>

            <Grid item xs={12} sm={6} className="inputWrapper">
              <CategorySelectBox
                fullWidth
                id="inp-category"
                variant="outlined"
                className="input"
                label="دسته بندی آپارات"
                value={data.category}
                onChange={(value) => changeData("category", value)}
              />
            </Grid>

            <Grid item xs={12} className="inputWrapper">
              <TextField
                fullWidth
                id="inp-info"
                multiline
                rows={3}
                className="input"
                variant="outlined"
                label="توضیحات اضافه"
                defaultValue={data.info}
                onChange={(e) => changeData("info", e.target.value.trim())}
              />
            </Grid>

            <Grid item xs={12} sm={6} className="inputWrapper">
              <TagSelectBox
                fullWidth
                id="inp-category"
                variant="outlined"
                className="input"
                label="برچسپ ها"
                max={10}
                value={data.tags}
                onChange={(value) => changeData("tags", value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} className="inputWrapper">
              <CategorySelectBox
                fullWidth
                channel
                id="inp-category-channel"
                variant="outlined"
                className="input"
                label="دسته بندی کانال"
                value={data.channel_category}
                onChange={(value) => changeData("channel_category", value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} className="inputWrapper">
              <PlayListSelectBox
                fullWidth
                id="inp-playlist"
                variant="outlined"
                className="input"
                label="عنوان لیست پخش جدید"
                value={data.playlist}
                onChange={(value) => changeData("playlist", value)}
              />
            </Grid>
          </Grid>
        )}
        {selectedTab === 1 && (
          <Grid item className="tabContent">
            <FormControlLabel
              className="formButton"
              control={
                <Switch
                  checked={data.enable_watermark}
                  onChange={(event) =>
                    changeData("enable_watermark", event.target.checked)
                  }
                  value="enable_watermark"
                  color="primary"
                />
              }
              label="افزودن واترمارک"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={data.enable_comments}
                  onChange={(event) =>
                    changeData("enable_comments", event.target.checked)
                  }
                  value="enable_comments"
                  color="primary"
                />
              }
              label="امکان ثبت نظرات"
            />
          </Grid>
        )}
      </Grid>

      <Grid item className="btn-wrapper">
        <Button
          style={{ color: "#fff" }}
          color="primary"
          variant="contained"
          size="large"
          className="btn btn-publish-later"
          onClick={handlePublishLater}
        >
          ذخیره بعدا منتشر میکنم
        </Button>

        <Button
          style={{ color: "#fff" }}
          color="danger"
          variant="contained"
          size="large"
          className="btn btn-publish"
          onClick={handlePublish}
        >
          انتشار ویدیو
        </Button>
      </Grid>
    </Wrapper>
  );
}

export default FileUploadInfo;
