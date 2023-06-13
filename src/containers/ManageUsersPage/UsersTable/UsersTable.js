import { Chip } from "@mui/material";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TablePagination } from "@mui/material";
import { TableRow } from "@mui/material";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { USER_TYPE_ADMIN } from "../../../constans";
import { UsersTableWrapper } from "../styles";

const columns = [
  { name: "id", title: "کد" },
  { name: "name", title: "نام" },
  { name: "mobile", title: "موبایل", dir: "ltr" },
  { name: "email", title: "ایمیل" },
  {
    name: "type",
    title: "نوع کاربری",
    cast: (v) => (
      <Chip
       
        label={v === USER_TYPE_ADMIN ? "مدیر" : "کاربر"}
        style={{ backgroundColor: v === USER_TYPE_ADMIN ? "#E50057" : "#EBEBEB", color: v === USER_TYPE_ADMIN ? "#fff" : "#000" }}
      />
    ),
  },
  { name: "created_at", title: "تاریخ ثبت نام", dir: "ltr", cast: (v) => v },
  {
    name: "verified_at",
    title: "وضعیت",
    cast: (v) =>
      v ? "تایید شده" : <b style={{ color: "#f50057" }}>تایید نشده</b>,
  },
];

// eslint-disable-next-line no-unused-vars
function UsersTable({ users, page, size, total, onChangePage, onRowClick }) {
  function handleChangePage(newPage) {
    onChangePage(newPage + 1, size);
  }

  function handleChangeRowsPerPage(e) {
    onChangePage(1, parseInt(e.target.value, 10));
  }

  return (
    <UsersTableWrapper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.name}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={user.id}
                onClick={() => onRowClick(user)}
              >
                {columns.map((column) => {
                  const value = user[column.name];
                  return (
                    <TableCell
                      key={column.name}
                      align={column.align}
                      dir={column.dir}
                    >
                      {column.cast ? column.cast(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={total}
        rowsPerPage={size}
        page={page - 1}
        labelRowsPerPage=""
        labelDisplayedRows={() => `صفحه ${page}`}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </UsersTableWrapper>
  );
}

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

export default memo(UsersTable);
