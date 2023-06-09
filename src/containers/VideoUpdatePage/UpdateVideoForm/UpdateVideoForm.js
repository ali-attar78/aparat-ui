import React, { memo, useState } from "react";
import styled from "styled-components";
import PorpTypes from "prop-types";
import { useNavigate } from "react-router-dom";


import {
  Grid,
  TextField,
  Button,
  Tooltip,
  FormControlLabel,
  Switch,
} from "@mui/material";

import LinkIcon from "@mui/icons-material/OpenInNewOutlined";
import CopyAddressIcon from "@mui/icons-material/FileCopyOutlined";

import TagSelectBox from "../../../components/TagSelectBox";
import CategorySelectBox from "../../../components/CategorySelectBox";
import PlayListSelectBox from "../../../components/PlayListSelectBox";
import uploadBannerService from "../../../services/uploadVidoeBanner/uploadVideoBanner";
import UpdateVideoService from "../../../services/UpdateVideoApi/updateVideoApi";

import { ROUTE_VIDEO_SHOW } from "../../../routes";
import { BASE_URL } from "./../../../constans";
import ErrorMessage from "../../../components/ErrorMessage";

const UpdateVideoFormWrapper = styled(Grid)`
  background: #fff;
  box-shadow: 0 0 2px 2px #f5f4f4;
  flex-grow: 1;
  max-width: 800px;
  margin: 30px auto;

  .tabContent {
    padding: 1rem;
  }

  .inputWrapper {
    width: 100%;
    margin-bottom: 1rem;

    label {
      font-weight: bold;
      padding-bottom: 0.8rem;
      display: inline-block;
    }

    .input {
      background: #fff;
    }

    .bannerImage {
      width: 100%;
      height: 200px;
    }
  }

  .videoLinkWrapper {
    position: relative;
    
    padding: 1em;
    margin-bottom: 1em;
    border-radius: 5px;
    box-shadow: 0 0 3px 0px #efe1e1;

    .label {
      font-weight: bold;
      margin-bottom: 1em;
      display: block;
    }

    .link {
      margin-top: 1.2em;
      text-align: left;
      font-size: 14px;
    }

    .copyAddressIcon {
      position: absolute;
      left: 0.9em;
      top: 0.9em;
      cursor: pointer;

      :hover,
      :focus {
        color: #000;
      }
    }
  }

  .btn-wrapper {
    .btn {
      margin-top: 0.6em;

      .MuiSvgIcon-root {
        padding: 0 0 0 2px;
        color: #717070;
      }
    }
  }

  [type="file"] {
    display: none;
  }

  p {
    font-size: 12px;
  }
`;

function UpdateVideoForm({
  video: InputVideo,
  // banner,
  // dispatch,
  // onSelectBanner,
}) {
  const [video, setVideo] = useState(InputVideo);
  const [errorBanner, setErrorBanner] = useState(null);
  const [newBannerId, setNewBannerId] = useState(null);
  const [errorUpdate, setErrorUpdate] = useState(null);
  const navigate = useNavigate();
  const UpdateVideo = UpdateVideoService();
  const uploadBanner = uploadBannerService();
  let uploadBannerRef = null;
  let linkElementRef = null;

  // console.log(InputVideo, video, banner);

  function changeData(key, value) {
    const newData = { ...video, [key]: value };
    console.log(newData);
    setVideo(newData);
  }

  async function handleBannerFileChange() {
    try {
      const { result, error } = await uploadBanner.uploadVideoBanner(
        uploadBannerRef.files[0],
        "/video/upload-banner"
      );
      if (error) {
        setErrorBanner(error);
        console.log(error);
      } else {
        setNewBannerId(result.banner);
        console.log(result.banner);
      }
    } catch (error) {
      console.log("any error");
    }
  }

  function handleShowVideo() {
    // dispatch(push(ROUTE_VIDEO_SHOW.replace(':slug', video.slug)));
  }

  async function handleUpdateVideo() {
    const changes = {};

    Object.entries(video).forEach(([key, value]) => {
      if (InputVideo[key] !== value) {
        changes[key] = value;
      }
    });

    if (newBannerId) {
      changes.banner = newBannerId;
    }

    try {
      const { result, error } = await UpdateVideo.updateVideo(
        changes,
        `/video/${video.slug}`
      );
      if (error) {
        setErrorUpdate(error);
        console.log(error);
      } else {
        navigate(`/video/${video.slug}`,{ state:video });
        console.log(result);
      }
    } catch (error) {
      console.log("any error");
    }

    console.log(changes);
  }

  function handleCopyAddress() {
    const range = document.createRange();
    range.selectNode(linkElementRef);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  }

  function bannerFile() {
    return video.banner_link;
  }

  return (
    <UpdateVideoFormWrapper container>
      <Grid item xs={12} md={7} className="tabContent">
        <Grid item xs={12} className="inputWrapper">
          <label htmlFor="inp-title">عنوان ویدیو</label>

          <TextField
            fullWidth
            id="inp-title"
            className="input"
            variant="outlined"
            defaultValue={video.title}
            onChange={(e) => changeData("title", e.target.value.trim())}
          />

          <p>
            عنوان ویدیو معرف ویدیو شماست. انتخاب عنوان خوب در جذب کاربران بسیار
            موثر است.
          </p>
        </Grid>

        <Grid item xs={12} className="inputWrapper">
          <label htmlFor="inp-info">توضیحات اضافه</label>

          <TextField
            fullWidth
            id="inp-info"
            multiline
            rows={3}
            className="input"
            variant="outlined"
            defaultValue={video.info}
            onChange={(e) => changeData("info", e.target.value.trim())}
          />

          <p>
            در توضیحات اضافه میتوانید محل وقوع حادثه، تاریخ رخ دادن آن یا هر
            نکته دیگری که مربوط به ویدیو میشود را وارد کنید.
          </p>
        </Grid>

        <Grid item xs={12} className="inputWrapper">
          <label htmlFor="inp-tag">برچسپ ها</label>

          <TagSelectBox
            fullWidth
            id="inp-tag"
            variant="outlined"
            className="input"
            max={5}
            value={video.tags.map((item) => item.id)}
            onChange={(value) => changeData("tags", value)}
          />

          <p>
            برچسب ها ، عبارات کلیدی ویدیو شما می باشند که با انتخاب درست آنها
            میتوانید رابطه بین ویدیو خود و ویدیو های مشابه را قوی تر کنید.
          </p>
        </Grid>

        <Grid item xs={12} className="inputWrapper">
          <label htmlFor="inp-category">دسته بندی آپارات</label>

          <CategorySelectBox
            fullWidth
            id="inp-category"
            variant="outlined"
            className="input"
            value={video.category_id}
            onChange={(value) => changeData("category", value)}
          />
        </Grid>

     

        <Grid item xs={12} className="inputWrapper">
          <label htmlFor="inp-category-channel">دسته بندی کانال</label>
          <CategorySelectBox
            fullWidth
            channel
            id="inp-category-channel"
            variant="outlined"
            className="input"
            value={video.channel_category_id}
            onChange={(value) => changeData("channel_category", value)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} md={5} className="tabContent">
        <Grid item xs={12} className="inputWrapper">
          <img
            className="bannerImage"
            src={
              newBannerId
                ? BASE_URL + "videos/tmp/" + newBannerId
                : bannerFile()
            }
            alt={video.title}
          />
        </Grid>

        <Grid item xs={12} className="inputWrapper">
          <input
            type="file"
            accept="image/*"
            ref={(el) => {
              uploadBannerRef = el;
            }}
            onChange={handleBannerFileChange}
          />
          <Button
            fullWidth
            variant="outlined"
            onClick={(e) => uploadBannerRef.click(e)}
          >
            بارگذاری تصویر
          </Button>

          {errorBanner && (
            <ErrorMessage
              style={{ fontSize: "10px" }}
              error={errorBanner}
              forceMessage="در بارگذاری تصویر خطایی به وجود آمده است"
            />
          )}

          {errorUpdate && <ErrorMessage error={errorUpdate} />}
        </Grid>

        <Grid item xs={12} className="inputWrapper">
          <FormControlLabel
            control={
              <Switch
                checked={!!video.enable_comments}
                onChange={(event) =>
                  changeData("enable_comments", !!event.target.checked)
                }
                value="enable_comments"
                color="primary"
              />
            }
            label="امکان ثبت نظرات"
          />
        </Grid>

        <Grid item xs={12} className="videoLinkWrapper">
          <span className="label">آدرس ویدیو</span>
          <Tooltip disableFocusListener title="کپی کردن آدرس ویدیو">
            <CopyAddressIcon
              className="copyAddressIcon"
              onClick={handleCopyAddress}
            />
          </Tooltip>
          <div
            className="link"
            ref={(el) => {
              linkElementRef = el;
            }}
          >
            {window.location.origin}
            {ROUTE_VIDEO_SHOW.replace(":slug", video.slug)}
          </div>
        </Grid>

        <Grid item xs={12} className="btn-wrapper">
          <Button
            style={{ color: "#fff" }}
            fullWidth
            color="danger"
            variant="contained"
            size="large"
            className="btn btn-publish"
            disabled={
              newBannerId
                ? false
                : JSON.stringify(InputVideo) === JSON.stringify(video)
            }
            // onClick={handlePublish}
            onClick={handleUpdateVideo}
          >
            به روز رسانی
          </Button>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            className="btn btn-redirect"
            onClick={handleShowVideo}
          >
            <LinkIcon /> مشاهده ویدیو
          </Button>
        </Grid>
      </Grid>
    </UpdateVideoFormWrapper>
  );
}

UpdateVideoForm.propTypes = {
  video: PorpTypes.object.isRequired,
};

export default memo(UpdateVideoForm);
