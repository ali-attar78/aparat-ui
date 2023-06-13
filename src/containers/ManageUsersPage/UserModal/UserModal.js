import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent 
} from '@mui/material';


import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import styled from 'styled-components'

import { USER_TYPE_ADMIN, USER_TYPE_USER } from '../../../constans';
import { UserModalWrapper } from '../styles';
import UpdateUserService from '../../../services/UpdateUserApi/UpdateUserApi';
import ResetUserPasswordService from '../../../services/ResetUserPasswordApi/ResetUserPasswordApi';
import DeleteUserService from '../../../services/DeleteUserApi/DeleteUserApi';



 const InputWithLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  label {
    font-size: 0.8em;
    color: #888;
  }
`;

 const TwoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  > :not(.space) {
    flex: 1;
  }

  :not(:last-of-type) {
    margin-bottom: 1.5em;
  }

  .space {
    width: 1em;
  }
`;

function UserModal({
  user,
  onSuccessMessage,
  onErrorMessage,
  onUpdate,
  onResetPassword,
  onDelete,
  // updateData,
  // resetPasswordData,
  // deleteUserData,
  // dispatch,
  onClose,
}) {
  const [userData, setUserData] = useState(user);
  const [loading, setLoading] = useState(false);
  const UpdateUserApi=UpdateUserService();
  const ResetUserPasswordApi=ResetUserPasswordService();
  const DeleteUserApi=DeleteUserService();

  const isUpdated =
    user.name !== userData.name ||
    user.type !== userData.type ||
    user.email !== userData.email ||
    user.mobile !== userData.mobile ||
    user.website !== userData.website;


  async function handleUpdateUserData() {
    setLoading(true);
    try {
      const response = await UpdateUserApi.UpdateUser(
        userData,
        `user/${user.id}`
      );
      if (response.error) {
        console.log(response.error);
        onErrorMessage("به روزرسانی کاربر با خطا مواجه شد");
      } else {
        console.log(response.result);
        onSuccessMessage("کاربر با موفقیت بروززسانی شد");
        onUpdate(response.result);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleResetPassword() {
    setLoading(true);

    try {
      const response = await ResetUserPasswordApi.ResetUserPassword(
        `user/${user.id}/reset-password`
      );
      if (response.error) {
        console.log(response.error);
        onErrorMessage("بازیابی گذرواژه کاربر با خطا مواجه شد");
      } else {
        console.log(response.result);
        onSuccessMessage("بازیابی گذرواژه کاربر با موفقیت انجام شد");
        onResetPassword(response.result);
        setLoading(false);

      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteUser() {
    setLoading(true);

    try {
      const response = await DeleteUserApi.DeleteUser(
        `user/${user.id}`
      );
      if (response.error) {
        console.log(response.error);
        onErrorMessage("حذف کاربر با خطا مواجه شد");
      } else {
        console.log(response.result);
        onSuccessMessage("حذف کاربر با موفقیت انجام شد");
        onDelete(response.result);
        setLoading(false);

      }
    } catch (error) {
      console.error(error);
    }
  }



  function handleChangeData(e) {
    let key;
    let value ;
    if(e.currentTarget){
     key = e.currentTarget.id.replace('user-', '');
      value = e.currentTarget;
    }

    if ('value' in e.target) {
      key = key || e.target.name;
      // eslint-disable-next-line prefer-destructuring
      value = e.target.value;
    }

    setUserData({ ...userData, [key]: value });
  }

  return (
    <UserModalWrapper open>
      <DialogTitle>اطلاعات کاربری</DialogTitle>

      <DialogContent>
        <TwoColumn>
          <InputWithLabel>
            <label htmlFor="user-name">نام کاربر</label>
            <Input
              id="user-name"
              value={userData.name || ''}
              disabled={loading}
              onChange={handleChangeData}
            />
          </InputWithLabel>

          <span className="space" />

          <InputWithLabel>
            <label htmlFor="user-type">نوع کاربری</label>
            <Select
              id="user-type"
              name="type"
              value={userData.type}
              disabled={loading}
              onChange={handleChangeData}
            >
              <MenuItem value={USER_TYPE_ADMIN}>مدیر</MenuItem>
              <MenuItem value={USER_TYPE_USER}>کاربر</MenuItem>
            </Select>
          </InputWithLabel>
        </TwoColumn>

        <TwoColumn>
          <InputWithLabel>
            <label htmlFor="user-mobile">شماره موبایل</label>
            <Input
              id="user-mobile"
              value={userData.mobile || ''}
              disabled={loading}
              dir="ltr"
              onChange={handleChangeData}
            />
          </InputWithLabel>

          <span className="space" />

          <InputWithLabel>
            <label htmlFor="user-email">ایمیل</label>
            <Input
              id="user-email"
              value={userData.email || ''}
              disabled={loading}
              dir="ltr"
              onChange={handleChangeData}
            />
          </InputWithLabel>
        </TwoColumn>

        <TwoColumn>
          <InputWithLabel>
            <label htmlFor="user-website">آدرس وبسایت</label>
            <Input
              id="user-website"
              value={userData.website || ''}
              disabled={loading}
              dir="ltr"
              onChange={handleChangeData}
            />
          </InputWithLabel>
        </TwoColumn>
      </DialogContent>

      <DialogActions className="DialogActions">
        <div>
          <Button
            variant="outlined"
            disabled={!isUpdated || loading}
            onClick={handleUpdateUserData}
          >
            ویرایش اطلاعات
          </Button>

          <Button
            variant="outlined"
            disabled={loading}
            onClick={handleResetPassword}
          >
            بازنشانی گذرواژه
          </Button>

          {user.type !== USER_TYPE_ADMIN && (
            <Button
              color="secondary"
              variant="outlined"
              disabled={loading}
              onClick={handleDeleteUser}
            >
              حذف کاربر
            </Button>
          )}
        </div>

        <Button color="secondary"
         disabled={loading}
          onClick={onClose}>
          انصراف
        </Button>
      </DialogActions>
    </UserModalWrapper>
  );
}

UserModal.propTypes = {
  user: PropTypes.object.isRequired,

  onClose: PropTypes.func.isRequired,
};


export default memo(UserModal);
