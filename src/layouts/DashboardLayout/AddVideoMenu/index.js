/**
 *
 * AddVideoMenu
 *
 */

import React from 'react';
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

function AddVideoMenu() {
  return (
    <IconButton
      aria-label="Show 17 new notifications"
      color="inherit"
      size="small"
    >
      <AddIcon />
    </IconButton>
  );
}

export default AddVideoMenu;
