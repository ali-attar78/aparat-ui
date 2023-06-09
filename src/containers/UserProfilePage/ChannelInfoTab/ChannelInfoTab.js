import React, { memo, useState, useEffect } from "react";

import PropTypes from "prop-types";
import styled from "styled-components";
import { InputBase, Button,Snackbar,Alert } from "@mui/material";

import UpdateChannelInfoService from "../../../services/UpdateChannelInfoApi/UpdateChannelInfoApi";
import UpdateSocialsChannelService from "../../../services/UpdateSocialsChannelApi/UpdateSocialsChannelApi";

import ChangeUserInfoModal from "../../../components/ChangeUserInfoModal";

const ChannelInfoTabWrapper = styled.div`
  position: relative;
  background: #fff;
  box-shadow: 0 1px 3px 0px #c2c1c1;
  padding: 2em;

  .sepratedPart {
    border-bottom: 1px solid #aaa;
    padding-bottom: 2em;
    margin-bottom: 2em;
  }

  .social-input {
    margin: 0.5em 0;
  }
`;


const Notification = ({ message, severity, onClose }) => {
  return (
    <Snackbar
      open={!!message}
      autoHideDuration={3000}
      onClose={onClose}
    >
      {message && (
        <Alert severity={severity} onClose={onClose}>
          {message}
        </Alert>
      )}
    </Snackbar>
  );
};


function ChannelInfoTab({}) {
  const [data, setData] = useState(null);
  const UpdateChannelInfoApi = UpdateChannelInfoService();
  const UpdateSocialsChannelApi = UpdateSocialsChannelService();

  const [showChangeUserInfoModal, setShowChangeUserInfoModal] = useState(null);

  const [changedValueFromModal, setChangedValueFromModal] = useState(null);


  const [updateChannelInfo, setUpdateChannelInfo] = useState(null);
  const [errorUpdateChannelInfo, setErrorUpdateChannelInfo] = useState(null);

  const [updateSocialsChannel, setUpdateSocialsChannel] = useState(null);
  const [errorUpdateSocials, setErrorUpdateSocials] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  async function handleUpdateChannelInfo(params) {
    try {
      const response = await UpdateChannelInfoApi.UpdateChannelInfo(
        params,
        "/channel"
      );
      if (response.error) {
        console.log(response.error);
        setErrorUpdateChannelInfo(response.error);
        setErrorMessage("به روزرسانی کانال با خطا مواجه شد");
      } else {
        console.log(response.result);

        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user.channel.name = params.name;
        auth.user.channel.info = params.info;
        auth.user.website = params.website;
        localStorage.setItem("auth", JSON.stringify(auth));

        setUpdateChannelInfo(response.result);
        setSuccessMessage("کانال با موفقیت به روز رسانی شد");

      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSaveChangesSocials() {
    try {
      const response = await UpdateSocialsChannelApi.UpdateSocialsChannel(
        data.socials,
        "/channel/socials"
      );
      if (response.error) {
        console.log(response.error);
        setErrorUpdateSocials(response.error);
        setErrorMessage("به روزرسانی شبکه های اجتماعی با خطا مواجه شد");
      } else {
        console.log(response.result);

        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user.channel.socials = data.socials;
        localStorage.setItem("auth", JSON.stringify(auth));

        setUpdateSocialsChannel(response.result);
        setSuccessMessage("به روز رسانی شبکه های اجتماعی با موفقیت انجام شد");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    setData({
      channelName: auth.user.channel.name,
      channelInfo: auth.user.channel.info,
      website: auth.user.website,

      socials: auth.user.channel.socials || {
        cloob: "",
        lenzor: "",
        facebook: "",
        twitter: "",
        telegram: "",
      },

      username: auth.user.name,
      email: auth.user.email,
      mobile: auth.user.mobile,
      password: "",
    });
  }, [changedValueFromModal]);

  function handleChangeData(e) {
    const { value } = e.currentTarget;
    const key = e.currentTarget.id.replace("-input", "").split("-");

    if (key[1]) {
      setData({
        ...data,
        [key[0]]: { ...data[key[0]], [key[1]]: value },
      });
    } else {
      setData({
        ...data,
        [key[0]]: value,
      });
    }
  }

  function handleSaveChangesChannelInfo() {
    const params = {
      name: data.channelName,
      info: data.channelInfo,
      website: data.website,
    };

    handleUpdateChannelInfo(params);
  }

  function handleChangeFieldViaModal(e) {
    setShowChangeUserInfoModal(e.currentTarget.dataset.field);
  }

  if (!data) {
    return null;
  }

  return (
    <ChannelInfoTabWrapper>
      <div className="sepratedPart">
        <div className="inputGroup">
          <label htmlFor="channelName-input">نام کانال</label>
          <InputBase
            className="input"
            id="channelName-input"
            fullWidth
            inputProps={{
              value: data.channelName,
              onChange: handleChangeData,
            }}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="channelInfo-input">درباره کانال</label>
          <textarea
            className="input"
            id="channelInfo-input"
            rows={5}
            value={data.channelInfo}
            onChange={handleChangeData}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="website-input">آدرس اینترنتی</label>
          <InputBase
            className="input text-left"
            id="website-input"
            fullWidth
            inputProps={{
              value: data.website,
              onChange: handleChangeData,
            }}
          />
        </div>

        <Button
          className="btn btn-accept"
          onClick={handleSaveChangesChannelInfo}
        >
          ثبت تغییرات
        </Button>
      </div>

      <div className="sepratedPart">
        <div className="inputGroup">
          <label htmlFor="socials-input">شبکه های اجتماعی</label>
          <p>
            میتوانید آی‌دی کانال خود را در شبکه های اجتماعی برای کاربران به
            نمایش بگذارید
          </p>
          {Object.keys(data.socials).map((key) => (
            <InputBase
              key={key}
              className="input social-input text-left"
              fullWidth
              id={`socials-${key}-input`}
              inputProps={{
                placeholder: key,
                value: data.socials[key],
                onChange: handleChangeData,
              }}
            />
          ))}
        </div>

        <Button
          className="btn btn-accept"
          onClick={handleSaveChangesSocials}
        >
          ثبت تغییرات
        </Button>
      </div>

      <div className="inputGroup">
        <label htmlFor="username-input">نام کاربری</label>
        <InputBase
          className="input"
          id="username-input"
          fullWidth
          readOnly
          value={data.username}
        />
      </div>

      <div className="inputGroup hasAppend">
        <label htmlFor="email-input">ایمیل</label>
        <InputBase
          className="input text-left"
          id="email-input"
          fullWidth
          readOnly
          value={data.email}
        />

        <Button
          className="btn btn-accept append"
          data-field="email"
          onClick={handleChangeFieldViaModal}
        >
          تغییر
        </Button>
      </div>

      <div className="inputGroup hasAppend">
        <label htmlFor="mobile-input">موبایل</label>
        <InputBase
          className="input text-left"
          id="mobile-input"
          fullWidth
          readOnly
          value={data.mobile}
        />

        <Button
          className="btn btn-accept append"
          data-field="mobile"
          onClick={handleChangeFieldViaModal}
        >
          تغییر
        </Button>
      </div>

      <div className="inputGroup hasAppend">
        <label htmlFor="password-input">گذرواژه</label>
        <InputBase
          className="input"
          id="password-input"
          fullWidth
          readOnly
          placeholder="برای تغییر گذرواژه روی دکمه تغییر کلیک کنید"
        />

        <Button
          className="btn btn-accept append"
          data-field="password"
          onClick={handleChangeFieldViaModal}
        >
          تغییر
        </Button>
      </div>

      {showChangeUserInfoModal && (
        <ChangeUserInfoModal
          type={showChangeUserInfoModal}
          value={data[showChangeUserInfoModal]}
          onClose={() => setShowChangeUserInfoModal(null)}
          onChangeValue={(newValue) => setChangedValueFromModal(newValue) }
          onSuccess={(text) => setSuccessMessage(text)}
          onError={(txt) => setErrorMessage(txt)}
        />
      )}

<Notification
        message={successMessage || errorMessage}
        severity={successMessage ? "success" : "error"}
        onClose={() => {
          setSuccessMessage(null);
          setErrorMessage(null);
        }}
      />
    </ChannelInfoTabWrapper>
  );
}

export default memo(ChannelInfoTab);
