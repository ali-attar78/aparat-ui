/**
 *
 * DashboardLayout
 *
 */

import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import NavBar from "./NavBar";
import SidebarDrawer from "./SidebarDrawer";

const StyledDashboardWrapper = styled.div``;

function DashboardLayout({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <StyledDashboardWrapper>
      <NavBar toggleDrawer={toggleDrawer} />
      <SidebarDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <SidebarDrawer />
      <br />
      sidebar
      {children}
    </StyledDashboardWrapper>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(DashboardLayout);
