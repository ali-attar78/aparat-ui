/**
 *
 * MainLayout
 *
 */

import { Grid } from '@mui/material';

import React, { memo,useState } from 'react';

import styled from 'styled-components';
import NavBar from '../DashboardLayout/NavBar';
import SidebarDrawer from '../DashboardLayout/SidebarDrawer';


const StyledDashboardWrapper = styled.div`
  background: #fefefe;
  color: #6f7285;

  .contentWrapper {
    flex: 1;
    max-width: ${props => (props.fullWidth ? '100%' : '900px')};
    padding: 2em 15px;
    margin: 0 auto;
    height: calc(100vh - 50px);
    overflow-y: auto;
    position: relative;
    background-color: #fbfbfbc2;
    padding-right:${props => (props.isDrawerOpen ?'250px':'50px')};
    transition: padding-right 0.17s ease-in-out;


    &.withDrawer {
      margin-right: 195px;
    }
  }

  .sidebarDrawer > .MuiPaper-root {
    padding: 0 15px;
    min-width: 195px;
    margin-top: 48px;
    height: calc(100vh - 50px);
    border: solid 2px #ebebeb !important;

  }
`;

function MainLayout({
  children,
  fullWidth,
  drawerIsOpen
}) {


  const [isDrawerOpen, setIsDrawerOpen] = useState(drawerIsOpen);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <StyledDashboardWrapper fullWidth={fullWidth} isDrawerOpen={isDrawerOpen}>
      <NavBar toggleDrawer={toggleDrawer}/>
      <SidebarDrawer variant="persistent" isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

      <Grid container wrap="nowrap">
        <Grid
          item
          className='contentWrapper'
        >
          {children}
        </Grid>
      </Grid>

    </StyledDashboardWrapper>
  );
}

MainLayout.propTypes = {

};


export default memo(MainLayout);
