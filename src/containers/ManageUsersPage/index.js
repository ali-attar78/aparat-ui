/**
 *
 * ManageUsersPage
 *
 */

import ErrorMessage from "../../components/ErrorMessage";
import LoadingWithText from "../../components/LoadingWithText";
import ReloaderMessage from "../../components/ReloaderMessage";

import DashboardLayout from "../../layouts/DashboardLayout/dashboardLayout";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import GetUsersListService from "../../services/GetUsersListApi/GetUsersListApi";
import { Helmet } from "react-helmet";

import UserModal from "./UserModal/UserModal";
import UsersTable from "./UsersTable/UsersTable";
import Notification from "../../components/Notifications";

export function ManageUsersPage({}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [usersError, setUsersError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [updateUser, setUpdateUser] = useState(null);
  const [resetPassword, setResetPassword] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);




  const GetUsersListApi = GetUsersListService();

  async function getUsersFromServer() {
    try {
      const response = await GetUsersListApi.GetUsersList(
        `/user/list?page=${page || 1}&per_page=${pageSize || 10}`
      );
      if (response.error) {
        console.log(response.error);
        setUsersError(response.error);
      } else {
        console.log(response.result);
        setUsers(response.result);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const emptyList = !loading && users && users.data && !users.data.length;

  useEffect(() => {
    getUsersFromServer();
  }, [page, pageSize,updateUser,resetPassword,deleteUser]);

  const handlePageChange = (pageNumber, pageSize) => {
    setPage(pageNumber);
    setPageSize(pageSize);
  };

  return (
    <DashboardLayout fullWidth>
      <Helmet>
        <title>مدیریت کاربران</title>
        <meta name="description" content="مدیریت کاربران" />
      </Helmet>

      {!!(users && users.data && users.data.length) && (
        <UsersTable
          users={users.data}
          page={page}
          size={pageSize}
          total={users.total}
          onChangePage={handlePageChange}
          onRowClick={setSelectedUser}
        />
      )}

      {emptyList && (
        <ReloaderMessage
          message="هیچ کاربری یافت نشد"
          reloadMessage="بارگذاری مجدد"
          onReload={getUsersFromServer}
        />
      )}

      {selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSuccessMessage={setSuccessMessage}
          onErrorMessage={setErrorMessage}
          onUpdate={setUpdateUser}
          onResetPassword={setResetPassword}
          onDelete={setDeleteUser}
        />
      )}

      {loading && <LoadingWithText text="در حال دریافت لیست کاربران" />}

      <Notification
        message={successMessage || errorMessage}
        severity={successMessage ? "success" : "error"}
        onClose={() => {
          setSuccessMessage(null);
          setErrorMessage(null);
        }}
      />

      {usersError && (
        <ErrorMessage
          error={usersError}
          closeable={false}
          forceMessage={
            <ReloaderMessage
              message="در دریافت اطلاعات کاربران خطایی به وجود آمده است"
              reloadMessage="بارگذاری مجدد"
              onReload={getUsersFromServer}
            />
          }
        />
      )}
    </DashboardLayout>
  );
}

ManageUsersPage.propTypes = {};

export default ManageUsersPage;
