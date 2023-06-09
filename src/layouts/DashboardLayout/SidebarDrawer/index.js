/**
 *
 * SidebarDrawer
 *
 */

import React, { memo } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@mui/material";

import {
  Home as HomeIcon,
  DashboardOutlined,
  VideoLibraryOutlined,
  PlaylistPlayOutlined,
} from '@mui/icons-material';

import { useNavigate } from "react-router-dom";
import { ROUTE_HOME,ROUTE_DASHBOARD,ROUTE_MY_VIDEOS } from './../../../routes';


import PropTypes from "prop-types";
import styled from "styled-components";

import Logo from "../../../components/Logo/Logo";
import DrawerButton from "../DrawerButton";
import { useState } from "react";
import { useEffect } from "react";
import {getAuth} from '../../../utils/auth';

const StyledDrawer = styled(Drawer)`
  min-width: 180px;
  max-width: 250px;
  padding: 0 15px;

  .MuiListItemText-root {
    text-align: left;
    color: #6f7285;
  }

  .marginFromSide {
    margin-right: 15px;
  }

  ul.MuiList-root {
    border-bottom: 1px solid #e5e5e5;
    min-width: 150px;
  }

  .topLogoItem {
    margin-bottom: 15px;
    padding: 4px 0;
  }

  .MuiListItemIcon-root {
    min-width: 25px;
    color: #6f7285;
  }

  .MuiListItemText-root {
    text-align: right;
    color: #6f7285;
  }

  .MuiListItem-button {
    padding: 2px;
    transition: background-color 350ms ease;
  }

  .MuiListItem-button:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }

  .MuiDrawer-paper {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 15%;
  }

  .titles{
    color: #DF0F50;
    font-weight:bold;
    margin-bottom: 20px!important;
  }

  &.MuiDrawer-open .MuiDrawer-paper {
    transform: translateX(0);
  }

  @media (max-width: 600px) {
    .MuiDrawer-paper {
      width: 40%;
    }
  }
`;

function SidebarDrawer({ variant, isDrawerOpen, toggleDrawer }) {
  const [anchor, setAnchor] = useState("right");
  const navigate=useNavigate();
  const isLogedIn = getAuth();


  useEffect(() => {

    if (!isDrawerOpen && variant !== "persistent") {
      setAnchor("left");
    } 
    if(!isDrawerOpen && variant === "persistent") {
      setAnchor("left");
    }
  }, [isDrawerOpen, variant]);

  return (
    <StyledDrawer
    style={variant==="persistent"?{marginRight:"200px !important"}:null}
      className="sidebarDrawer"

      anchor={anchor}
      variant={variant}
      role="presentation"
      open={isDrawerOpen}
      onClose={() => {
        toggleDrawer(false);
      }}
    >
      <List>
        {variant === "temporary" && (
          <ListItem className="topLogoItem">
            <DrawerButton toggleDrawer={toggleDrawer} />
            <Logo size="small" className="marginFromSide" />
          </ListItem>
        )}

<ListItem button onClick={() => navigate(ROUTE_HOME)}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="صفحه اصلی" />
        </ListItem>

        {isLogedIn && (
          <>
            <ListItem button onClick={() => navigate(ROUTE_DASHBOARD)}>
              <ListItemIcon>
                <DashboardOutlined />
              </ListItemIcon>
              <ListItemText primary="داشبرد" />
            </ListItem>

            <ListItem button onClick={() => navigate(ROUTE_MY_VIDEOS)}>
              <ListItemIcon>
                <VideoLibraryOutlined />
              </ListItemIcon>
              <ListItemText primary="ویدیو های من" />
            </ListItem>
          </>
        )}

        <Divider />
        <br />
        <span className="titles">دسته بندی ها</span>
        <br />

        <ListItem button onClick={() => navigate(`${ROUTE_HOME}?category=7`)}>
          <ListItemIcon>
            <PlaylistPlayOutlined />
          </ListItemIcon>
          <ListItemText primary="طنز" />
        </ListItem>

        <ListItem button onClick={() => navigate(`${ROUTE_HOME}?category=5`)}>
          <ListItemIcon>
            <PlaylistPlayOutlined />
          </ListItemIcon>
          <ListItemText primary="بانوان" />
        </ListItem>

        <ListItem button onClick={() => navigate(`${ROUTE_HOME}?category=3`)}>
          <ListItemIcon>
            <PlaylistPlayOutlined />
          </ListItemIcon>
          <ListItemText primary="علم و تلکنولوژی" />
        </ListItem>

        <ListItem button onClick={() => navigate(`${ROUTE_HOME}?category=8`)}>
          <ListItemIcon>
            <PlaylistPlayOutlined />
          </ListItemIcon>
          <ListItemText primary="آموزشی" />
        </ListItem>

        <ListItem button onClick={() => navigate(`${ROUTE_HOME}?category=9`)}>
          <ListItemIcon>
            <PlaylistPlayOutlined />
          </ListItemIcon>
          <ListItemText primary="تفریحی" />
        </ListItem>






      </List>

    </StyledDrawer>
  );
}

SidebarDrawer.propTypes = {
  // variant: PropTypes.oneOf(["persistent", "temporary"]),
  isDrawerOpen: PropTypes.bool,
  toggleDrawer: PropTypes.func,
};

SidebarDrawer.defaultProps = {
  variant: "temporary",
};

export default memo(SidebarDrawer);
