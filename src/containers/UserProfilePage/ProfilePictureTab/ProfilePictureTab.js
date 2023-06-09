import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import ErrorMessage from "../../../components/ErrorMessage";
import PhotoIcon from "@mui/icons-material/Photo";
import uploadBannerChannelService from "../../../services/UploadChannelBannerApi/UploadChannelBannerApi";

const ProfilePictureTabWrapper = styled.div`
  position: relative;
  background: #fff;
  box-shadow: 0 1px 3px 0px #c2c1c1;
  padding: 2em;

  > b {
    margin-bottom: 1em;
  }

  > p {
    padding: 1em 0;
  }
`;

const AvatarSelectorWrapper = styled.div`
  border: 2px dashed #f5f5f9;
  width: 200px;
  height: 150px;
  margin: 1em;
  margin-right: 9em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1em;
  cursor: pointer;

  :hover {
    border-color: #eee;
  }

  input {
    display: none;
  }

  > svg {
    width: 50px;
    font-size: 50px;
    margin-bottom: 0.1em;
  }
`;

function ProfilePictureTab({ onBannerChange }) {
  let fileInputRef = null;
  const uploadBannerChannelApi = uploadBannerChannelService();
  const [file, setFile] = useState(null);
  const [uploadAvatarResponse, setUploadAvatarResponse] = useState(null);
  const [errorUploadResponse, setErrorUploadResponse] = useState(null);

  const isValidFile = file && file.size <= 1024000;

  function handleClickAvatarSelector(e) {
    fileInputRef.click(e);
  }

  function handleFileChange() {
    setFile(fileInputRef.files[0]);
  }

  async function handleUploadAvatarClick() {
    try {
      const response = await uploadBannerChannelApi.UploadChannelBanner(
        file,
        "/channel"
      );
      if (response.error) {
        console.log(response.error);
        setErrorUploadResponse(response.error);
      } else {
        console.log(response.result.banner);
        let auth = JSON.parse(localStorage.getItem("auth"));
        console.log(auth.user.channel.banner);
        auth.user.channel.banner = response.result.banner;
        localStorage.setItem("auth", JSON.stringify(auth));
        onBannerChange(response.result.banner);
        setUploadAvatarResponse(response.result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ProfilePictureTabWrapper>
      <b>تغییر تصویر پروفایل</b>
      <p>حداکثر حجم فایل مجاز 1 مگابایت است.</p>

      <AvatarSelectorWrapper onClick={handleClickAvatarSelector}>
        <PhotoIcon />

        <span>برای انتخاب تصویر آواتار کلیک کنید</span>

        <input
          type="file"
          accept=".png, .jpeg, .jpg"
          ref={(el) => {
            fileInputRef = el;
          }}
          onChange={handleFileChange}
        />
      </AvatarSelectorWrapper>

      <Button
        className="btn btn-accept"
        disabled={!isValidFile}
        onClick={handleUploadAvatarClick}
      >
        ثبت تغییرات
      </Button>

      {file && !isValidFile && (
        <ErrorMessage
          error={{}}
          forceMessage="اندازه فایل انتخاب شده اشتباه میباشد"
        />
      )}

      {errorUploadResponse && (
        <ErrorMessage
          error={errorUploadResponse}
          forceMessage="در ثبت تغییرات مشکلی به وجود آمده است"
        />
      )}
    </ProfilePictureTabWrapper>
  );
}

export default memo(ProfilePictureTab);
