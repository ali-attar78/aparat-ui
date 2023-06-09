/**
 *
 * AddVideoMenu
 *
 */

 import React from 'react';
 import { IconButton } from "@mui/material";
 import AddIcon from '@mui/icons-material/Add';
 import { useNavigate } from "react-router-dom";
 
 
 function AddVideoMenu() {
   const navigate = useNavigate();
 
   return (
     <IconButton
       aria-label="Add video"
       color="inherit"
       size="small"
       onClick={() => navigate("/upload")}
     >
       <AddIcon />
     </IconButton>
   );
 }
 
 export default AddVideoMenu;