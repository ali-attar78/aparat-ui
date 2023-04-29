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

  & .sidebarWrapper {
    z-index: 0;
    padding-bottom: 0px !important;
  }

  & .contentWrapper {
    padding: 0 15px;
  }
`;

function DashboardLayout({ children, showSidebar }) {
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
        <Grid item className="contentWrapper">
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
