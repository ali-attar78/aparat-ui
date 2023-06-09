/**
 *
 * ChangeUserInfoModal
 *
 */

import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputBase,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";

import UpdateChannelUserInfoService from "../../services/UpdateChannelUserInfoApi/UpdateChannelUserInfoApi";
import SubmitConfirmCodeService from "../../services/SubmitConfirmCodeApi/SubmitConfirmCodeApi";

const Wrapper = styled(Dialog)`
  .MuiDialogContent-root {
    width: 500px;
    max-width: 100%;
  }

  .MuiButtonBase-root {
    margin: 0 0.25em;
  }
`;

const titles = {
  email: "ایمیل",
  mobile: "موبایل",
  password: "گذرواژه",
};

function ChangeUserInfoModal({ type, value, onClose, onChangeValue,onSuccess,onError }) {
  const UpdateChannelUserInfoApi = UpdateChannelUserInfoService();
  const SubmitConfirmCodeApi = SubmitConfirmCodeService();

  const [currentValue, setCurrentValue] = useState(value);
  const [oldPassword, setOldPassword] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const isPassword = type === "password";
  const [hasUpdated, setHasUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [updatedResponse, setUpdatedResponse] = useState(null);
  const [ErrorhasUpdated, setErrorHasUpdated] = useState(null);

  const [confirmCodeResponse, setConfirmCodeResponse] = useState(null);
  const [errorConfirmCResponse, setErrorConfirmCResponse] = useState(null);

  async function handleUpdateChannelUserInfo(params) {
    try {
      let response;

      if ("password" in params) {
        console.log("hi");

        const data = {
          old_password: params.oldPassword,
          new_password: params.password,
        };

        console.log(data);
        response = await UpdateChannelUserInfoApi.UpdateChannelUserInfo(
          data,
          "/change-password"
        );
      } else {
        const { oldPassword, ...newParams } = params;
        console.log(newParams);
        response = await UpdateChannelUserInfoApi.UpdateChannelUserInfo(
          newParams,
          "channel/user-info"
        );
      }

      if (response.error) {
        console.log(response.error);
        setErrorHasUpdated(response.error);
        onError("ارسال کد تایید با خطا مواجه شده است لطفا بعدا تلاش کنید");
      } else {
        console.log(response.result);
        setUpdatedResponse(response.result);
        setHasUpdated(true);
        if ("password" in params) {
          onSuccess("بروزرسانی با موفقیت انجام شد");

          }
          else{
            onSuccess("کد تایید به ایمیل شما ارسال شد");
          }
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmitConfirmCode() {
    const code = {
      code: confirmCode,
    };

    try {
      const response = await SubmitConfirmCodeApi.SubmitConfirmCode(
        code,
        "/channel/user-info-confirm"
      );
      if (response.error) {
        console.log(response.error);
        setErrorConfirmCResponse(response.error);
        onError("به روزرسانی با خطا مواجه شد");
      } else {
        console.log(response.result);
        setConfirmCodeResponse(response.result);

        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user[type] = currentValue;
        console.log("Updated auth:", auth);
        localStorage.setItem("auth", JSON.stringify(auth));

        onChangeValue(currentValue);
        onSuccess("بروزرسانی با موفقیت انجام شد");

      }
    } catch (error) {
      console.error(error);
    }
  }

 

  useEffect(() => {
    if (hasUpdated && isPassword) {
      handleClose();
    }
  }, [updatedResponse]);

  useEffect(() => {
    if (confirmCodeResponse) {
      handleClose();
    }
  }, [confirmCodeResponse]);

  function handleClose() {
    onClose();
  }

  function handleSubmitChange() {
    setIsLoading(true);
    handleUpdateChannelUserInfo({
      [type]: currentValue,
      oldPassword,
    });
  }

  function renderUpdateContent() {
    return (
      <>
        <DialogContent>
          {!isPassword && (
            <div className="inputGroup">
              <label htmlFor="socials-input">{titles[type]} قبلی</label>

              <InputBase
                fullWidth
                readOnly
                className="input text-left"
                type={isPassword ? "password" : "text"}
                defaultValue={value}
              />
            </div>
          )}

          {isPassword && (
            <div className="inputGroup">
              <label htmlFor="socials-input">{titles[type]} قبلی</label>

              <InputBase
                fullWidth
                className="input"
                type={isPassword ? "password" : "text"}
                inputProps={{
                  placeholder: `${titles[type]} قبلی`,
                  value: oldPassword,
                  onChange: (e) => setOldPassword(e.currentTarget.value),
                }}
              />
            </div>
          )}

          <div className="inputGroup">
            <label htmlFor="socials-input">{titles[type]} جدید</label>

            <InputBase
              fullWidth
              className={`input ${isPassword ? "" : "text-left"}`}
              type={isPassword ? "password" : "text"}
              inputProps={{
                placeholder: `${titles[type]} جدید`,
                value: currentValue,
                onChange: (e) => setCurrentValue(e.currentTarget.value),
              }}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            disabled={isLoading}
            onClick={handleSubmitChange}
          >
            تایید
          </Button>

          <Button
            onClick={handleClose}
            color="secondary"
            disabled={isLoading}
            autoFocus
            variant="outlined"
          >
            انصراف
          </Button>
        </DialogActions>
      </>
    );
  }

  function renderConfirmCodeContent() {
    return (
      <>
        <DialogContent>
          <div className="inputGroup">
            <label htmlFor="socials-input">کد تایید را وارد نمایید</label>

            <InputBase
              fullWidth
              className="input"
              type={isPassword ? "password" : "text"}
              inputProps={{
                placeholder: `کد تاییدی که به ${titles[type]} شما ارسال شده است را وارد نمایید`,
                value: confirmCode,
                onChange: (e) => setConfirmCode(e.currentTarget.value),
              }}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            disabled={confirmCode.trim().length < 4}
            onClick={handleSubmitConfirmCode}
          >
            تایید
          </Button>

          <Button
            onClick={handleSubmitChange}
            color="primary"
            variant="outlined"
          >
            ارسال مجدد کد تایید
          </Button>

          <Button
            onClick={handleClose}
            color="secondary"
            disabled={isLoading}
            autoFocus
            variant="outlined"
          >
            انصراف
          </Button>
        </DialogActions>
      </>
    );
  }

  return (
    <Wrapper open>
      <DialogTitle id="alert-dialog-title">تغییر {titles[type]}</DialogTitle>

      {!hasUpdated && renderUpdateContent()}

      {hasUpdated && renderConfirmCodeContent()}
    </Wrapper>
  );
}

ChangeUserInfoModal.propTypes = {
  type: PropTypes.oneOf(["email", "mobile", "password"]).isRequired,
  value: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default memo(ChangeUserInfoModal);
