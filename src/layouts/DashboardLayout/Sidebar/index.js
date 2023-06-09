/**
 *
 * Sidebar
 *
 */

import React,{useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as routes from "../../../routes";

// import PropTypes from 'prop-types';
import styled from "styled-components";

import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import LogoutService from "../../../services/LogoutApi/LogoutApi";

import SettingIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MovieIcon from "@mui/icons-material/Theaters";
import CommentIcon from "@mui/icons-material/ModeComment";
import FollowedChannelsIcon from "@mui/icons-material/Subscriptions";
import ChartIcon from "@mui/icons-material/PieChart";
import LoguotIcon from "@mui/icons-material/PowerSettingsNew";

const Wrapper = styled.div`
  width: 180px;
  background: #fff;
  box-shadow: -1px 2px 2px #eee;

  min-height: calc(100vh - 50px);

  & .channelSetting {
    background: #fff;
    display: block;
    text-align: center;
    margin-top: 4vh;
    margin-bottom: 9vh;
    cursor: pointer;

    .userAvatar {
      width: 140px;
      height: 140px;
      padding: 0.5em;
      border: 3px solid #eee;
      border-radius: 100%;
    }
  }

  & .channelSetting .MuiSvgIcon-root,
  & .channelSetting .MuiListItemText-root {
    display: block;
    width: 100%;
    margin: auto;
    text-align: center;
  }

  & .channelSetting .MuiSvgIcon-root {
    font-size: 120px;
    width: 120px;
    color: #e5e5e5;
  }

  & .channelSetting svg {
    background: #fff;
    box-shadow: 0 0 2px 1px #e2dfdf;
    border-radius: 100%;
    padding: 0;
    display: block;
  }

  & .channelSetting .MuiTypography-root {
    font-weight: bold;
  }

  & .MuiSvgIcon-root,
  & .MuiListItemText-root {
    color: #6f7285;
  }

  & .MuiListItemText-root {
    font-size: 1rem;
  }

  & .MuiListItemIcon-root {
    min-width: 30px;
  }

  & .MuiListItemText-root {
    text-align: right;
  }

  & .settingIcon {
    position: absolute;
    left: 32px;
    top: 22px;
    background: #e5e5e5 !important;
    border: 1px solid #e1e1e1 !important;
    cursor: pointer;
    transition: opacity 130ms ease;
  }

  & .settingIcon,
  & .settingIcon svg {
    font-size: 20px !important;
    width: 20px !important;
    color: #6f7285 !important;
  }


  & .settingIcon:hover {
    opacity: 0.8;
  }

  & .logoutItem {
    position: absolute;
    bottom: 0;
    width: 180px;
  }

  @media (max-width: 768px) {
    & {
      display: none;
    }
  }

  @media (max-height: 560px) {
    & .channelSetting {
      margin-bottom: 0vh;
    }
  }
`;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const LogoutApi = LogoutService();
  const [responseError,setResponseError]=useState(null);

  
  async function handleLogout() {
    try {
      const response = await LogoutApi.Logout('/logout');
      if (response.error) {
        console.log(response.error);
        setResponseError(response.error);
      } else {
        console.log(response.result);
        // setLoading(false);
        localStorage.removeItem('auth');
        navigate(routes.ROUTE_LOGIN);

      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Wrapper>
      <List component="nav">
        <ListItem className="channelSetting">
          <SettingIcon
            className="settingIcon"
            onClick={() => navigate(routes.ROUTE_MY_PROFILE)}
          />
          <ListItemIcon
            onClick={() =>
              navigate(
                `/channel/${JSON.parse(localStorage.getItem("auth")).user.channel.name}`
              )
            }
          >
            <img
              src={JSON.parse(localStorage.getItem("auth")).user.channel.banner
              ?
              JSON.parse(localStorage.getItem("auth")).user.channel.banner
              :
              JSON.parse(localStorage.getItem("auth")).user.avatar}
              alt="تصویر کاربر"
              className="userAvatar"
            />
          </ListItemIcon>
          <ListItemText
            primary={JSON.parse(localStorage.getItem("auth")).user.name}
            onClick={() =>
              navigate(
                `/channel/${JSON.parse(localStorage.getItem("auth")).user.channel.name}`
              )
            }
          />
        </ListItem>

        <ListItem
          button
          selected={routes.ROUTE_DASHBOARD === pathname}
          onClick={() => navigate(routes.ROUTE_DASHBOARD)}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="داشبرد" />
        </ListItem>

        <ListItem
          button
          selected={routes.ROUTE_MY_VIDEOS === pathname}
          onClick={() => navigate(routes.ROUTE_MY_VIDEOS)}
        >
          <ListItemIcon>
            <MovieIcon />
          </ListItemIcon>
          <ListItemText primary="ویدیوهای من" />
        </ListItem>

        <ListItem
          button
          selected={routes.ROUTE_COMMENTS === pathname}
          onClick={() => navigate(routes.ROUTE_COMMENTS)}
        >
          <ListItemIcon>
            <CommentIcon />
          </ListItemIcon>
          <ListItemText primary="دیدگاه ها" />
        </ListItem>

        <ListItem
          button
          selected={routes.ROUTE_FOLLOWED_CHANNELS === pathname}
          onClick={() => navigate(routes.ROUTE_FOLLOWED_CHANNELS)}
        >
          <ListItemIcon>
            <FollowedChannelsIcon />
          </ListItemIcon>
          <ListItemText primary="کانال های دنبال شده" />
        </ListItem>

        <ListItem
          button
          selected={routes.ROUTE_STATISTICS === pathname}
          onClick={() => navigate(routes.ROUTE_STATISTICS)}
        >
          <ListItemIcon>
            <ChartIcon />
          </ListItemIcon>
          <ListItemText primary="آمار بازدید" />
        </ListItem>
      </List>

      <ListItem button
       onClick={handleLogout}
      className="logoutItem">
        <ListItemIcon>
          <LoguotIcon />
        </ListItemIcon>
        <ListItemText primary="خروج ازحساب کاربری" />
      </ListItem>
    </Wrapper>
  );
}

Sidebar.propTypes = {};

export default Sidebar;
