/**
 *
 * UserMenu
 *
 */

import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MovieIcon from "@mui/icons-material/Theaters";
import CommentIcon from "@mui/icons-material/ModeComment";
import FollowedChannelsIcon from "@mui/icons-material/Subscriptions";
import LoginIcon from "@mui/icons-material/VpnKey";
import ChartIcon from "@mui/icons-material/PieChart";
import LoguotIcon from "@mui/icons-material/PowerSettingsNew";
import { useNavigate } from "react-router-dom";
import LogoutService from "../../../services/LogoutApi/LogoutApi";

import {
  ROUTE_LOGIN,
  ROUTE_MY_VIDEOS,
  ROUTE_MY_PROFILE,
  ROUTE_DASHBOARD,
  ROUTE_FOLLOWED_CHANNELS,
  ROUTE_COMMENTS,
  ROUTE_STATISTICS,
} from "../../../routes";

const StyledMenu = styled(Menu)`
  margin-top: 0px;
  margin-left: 10px;

  & .MuiSvgIcon-root {
    color: #6f7285;
  }

  & ul {
    padding-top: 0;
  }

  & li {
    padding: 0 16px;
    margin: 0;
    min-height: 30px;
    min-width: 200px;
  }

  & .channelMenu {
    min-height: 50px;
    background: #f4f4f4;
    display: block;
    text-align: right;
    padding-top: 5px;
    font-size: 0.8rem;
    padding-right: 40px;
  }

  & .channelMenu:hover {
    background: #f4f4f4;
  }

  & .channelMenu .channelUserIcon {
    float: right;
    margin-right: -35px;
    margin-top: 5px;
  }

  & .channelMenu .channelTitle {
    display: block;
  }

  & .channelMenu .channelSetting {
    display: block;
    font-size: 0.6rem;
  }

  & .channelMenu .channelSetting .MuiSvgIcon-root {
    font-size: 0.8rem;
    margin-top: 1px;
    float: right;
    margin-left: 3px;
  }
`;

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [responseError, setResponseError] = useState(null);
  let auth = null;
  try {
    auth = JSON.parse(localStorage.getItem("auth"));
  } catch (error) {
    console.error("Error parsing auth from local storage:", error);
  }

  const LogoutApi = LogoutService();

  const navigate = useNavigate();

  function closeMenu(path, e) {
    if (path) {
      let target = e.target;
      while (target && target.tagName !== "DIV") {
        target = target.parentNode;
      }
      if (target) {
        navigate(path);
      } else {
        console.warn("Could not find parent div element:", e.target);
      }
    }
    setAnchorEl(null);
  }

  async function handleLogout() {
    try {
      const response = await LogoutApi.Logout("/logout");
      if (response.error) {
        console.log(response.error);
        setResponseError(response.error);
      } else {
        console.log(response.result);
        // setLoading(false);
        localStorage.removeItem("auth");
        navigate(ROUTE_LOGIN);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <IconButton
        aria-label="Account of current user"
        aria-controls="primary-account-menu"
        aria-haspopup="true"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        color="inherit"
        size="small"
        style={{ marginLeft: 15 }}
      >
        <AccountCircleIcon fontSize="large" />
      </IconButton>

      <StyledMenu
        anchorEl={anchorEl}
        id="primary-account-menu"
        keepMounted
        open={!!anchorEl}
        onClose={closeMenu}
      >
        {!auth && [
          <MenuItem
            key="login"
            onClick={(e) => closeMenu(ROUTE_LOGIN, e)}
            className="loginMenu"
          >
            <LoginIcon />
            ورود
          </MenuItem>,
        ]}

        {auth && [
          <MenuItem
            key="profile"
            onClick={(e) => closeMenu(ROUTE_MY_PROFILE, e)}
            className="channelMenu"
          >
            <AccountCircleIcon fontSize="large" className="channelUserIcon" />
            <b className="channelTitle">عنوان کانال</b>
            <div className="channelSetting">
              <SettingsIcon />
              تنظیمات کانال
            </div>
          </MenuItem>,

          <MenuItem
            key="dashboard"
            onClick={(e) => closeMenu(ROUTE_DASHBOARD, e)}
          >
            <DashboardIcon />
            داشبرد
          </MenuItem>,

          <MenuItem
            key="my-videos"
            onClick={(e) => closeMenu(ROUTE_MY_VIDEOS, e)}
          >
            <MovieIcon />
            ویدیوهای من
          </MenuItem>,

          <MenuItem
            key="comments"
            onClick={(e) => closeMenu(ROUTE_COMMENTS, e)}
          >
            <CommentIcon />
            دیدگاه ها
          </MenuItem>,

          <MenuItem
            key="followed-channels"
            onClick={(e) => closeMenu(ROUTE_FOLLOWED_CHANNELS, e)}
          >
            <FollowedChannelsIcon />
            کانال های دنبال شده
          </MenuItem>,

          <MenuItem
            key="statistics"
            onClick={(e) => closeMenu(ROUTE_STATISTICS, e)}
          >
            <ChartIcon />
            آمار بازدید
          </MenuItem>,

          <MenuItem key="logout" onClick={handleLogout}>
            <LoguotIcon />
            خروج ازحساب کاربری
          </MenuItem>,
        ]}
      </StyledMenu>
    </>
  );
}

export default UserMenu;
