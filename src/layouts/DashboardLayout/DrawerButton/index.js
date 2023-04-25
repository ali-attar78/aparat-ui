/**
 *
 * DrawerButton
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


const StyledButton = styled.div`
  & .MuiIconButton-root {
    padding: 7px;
  }

  & .MuiSvgIcon-root {
    color: #6f7285 !important;
  }
`;

function DrawerButton({ toggleDrawer }) {
  return (
    <StyledButton>
      <IconButton onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
    </StyledButton>
  );
}

DrawerButton.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

export default 
  memo(DrawerButton);