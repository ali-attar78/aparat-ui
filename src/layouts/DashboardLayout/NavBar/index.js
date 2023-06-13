/**
 *
 * NavBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { AppBar, Toolbar, Grid } from "@mui/material";

import UserMenu from '../UserMenu';
import NotificationMenu from '../NotificationMenu';
import AddVideoMenu from '../AddVideoMenu';
import SearchBar from '../SearchBar';
import DrawerButton from '../DrawerButton';

const StyledWrapper = styled.div`
  flexgrow: 1;
  color: #6f7285;
  position: relative;
  z-index: 50;

  & .MuiAppBar-root {
    background: #fff;
    border-bottom: 1px solid #e4e0e0;
    box-shadow: 0px 2px 2px -2px rgba(0, 0, 0, 0.2);
    min-height: 80px;
  }

  & .MuiSvgIcon-root {
    color: #9a9a9a;
  }

  & .MuiToolbar-root {
    justify-content: flex-end;
  }

  & .sectionDesktop {
    direction: ltr;
  }

  & .sectionDesktop .MuiSvgIcon-root {
    color: #6f7285;
  }

  & .leftItems,
  & .rightItems {
    max-width: auto;
  }

  & .css-zow5z4-MuiGrid-root>.MuiGrid-item{
    margin-top: 5px;
    padding-left: 0px !important;

  }

  & .searchBarWrapper {
    position: absolute;
    left: 10px;
    right: 10px;
    top: 13px;
  }

  @media (min-width: 600px) {
    & .searchBarWrapper {
      position: inherit;
    }

    & .MuiAppBar-root {
      min-height: auto;
    }

    & .leftItems,
    & .rightItems {
      max-width: 130px;
    }
  }
`;

function NavBar({ toggleDrawer }) {
  return (
    <StyledWrapper>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Grid container spacing={3}>
            <Grid item xs className="leftItems">
              <DrawerButton toggleDrawer={toggleDrawer} />
            </Grid>
            <Grid item xs className="searchBarWrapper">
              <SearchBar />
            </Grid>
            <Grid item xs className="rightItems">
              <div className="sectionDesktop">
                <UserMenu />

                <NotificationMenu />

                <AddVideoMenu />
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </StyledWrapper>
  );
}

// NavBar.propTypes = {};

export default NavBar;
