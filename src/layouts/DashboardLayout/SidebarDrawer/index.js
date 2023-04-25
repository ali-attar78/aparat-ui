/**
 *
 * SidebarDrawer
 *
 */

import React, { memo } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import HomeIcon from '@mui/icons-material/Home';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import Logo from '../../../components/Logo/Logo';
import DrawerButton from '../DrawerButton';
import { useState } from 'react';
import { useEffect } from 'react';

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
    transform: translateX(200px);
    transition: transform 1s ease-in-out;
    width: 15%;
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

function SidebarDrawer({ isDrawerOpen, toggleDrawer }) {

  const [anchor,setAnchor]=useState("right");

  useEffect(() => {
    if (!isDrawerOpen) {
      setAnchor("left");
    }
  }, [isDrawerOpen]);

  return (
    <StyledDrawer
    className="sidebarDrawer"
    anchor={anchor}
    role="presentation"   
    open={isDrawerOpen}
    onClose={() => {
    toggleDrawer(false);
    
      }
    }
    >
      <List>
        <ListItem className="topLogoItem">
        <DrawerButton toggleDrawer={toggleDrawer} />
          <Logo size="small" className="marginFromSide" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="خانه" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="منوی دوم" />
        </ListItem>
      </List>
    </StyledDrawer>
  );
}

SidebarDrawer.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};


export default
  memo(SidebarDrawer);