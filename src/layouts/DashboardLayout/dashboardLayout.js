/**
 *
 * DashboardLayout
 *
 */

import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Grid } from "@mui/material";

import NavBar from "./NavBar";
import SidebarDrawer from "./SidebarDrawer";
import Sidebar from "./Sidebar";

const StyledDashboardWrapper = styled.div`
  background: #fefefe;
  color: #6f7285;

  & .sidebarWrapper {
    z-index: 0;
    padding-bottom: 0px !important;
    position: relative;
  }

  & .contentWrapper {
    flex: 1;
    max-width: 100%;
    padding-top: 2em;
    padding: 15px 150px;
    margin: auto;
    height: calc(100vh - 50px);
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    background-color: #fbfbfbc2;

  }

  @media (max-width: 955px) {
    & .contentWrapper {
      padding: 25px;
    }
  }
`;

function DashboardLayout({ children, showSidebar, style }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <StyledDashboardWrapper>
      <NavBar toggleDrawer={toggleDrawer} />
      <SidebarDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

      <Grid
        container
        style={!showSidebar ? { justifyContent: "center" } : null}
      >
        {showSidebar ? (
          <Grid item className="sidebarWrapper">
            <Sidebar />
          </Grid>
        ) : null}
        <Grid item className="contentWrapper" style={{ style } ? style : null}>
          {children}
        </Grid>
      </Grid>
    </StyledDashboardWrapper>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

DashboardLayout.defaultProps = {
  showSidebar: true,
};

export default memo(DashboardLayout);
