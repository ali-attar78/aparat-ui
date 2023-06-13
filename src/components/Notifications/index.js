import React from "react";
import { Snackbar,Alert } from "@mui/material";


const Notification = ({ message, severity, onClose,duration }) => {
 

  return (
    <Snackbar open={!!message} autoHideDuration={duration?duration:3000} onClose={onClose} >
    {message && (
    <Alert severity={severity} onClose={onClose}>
    {message}
    </Alert>
    )}
    </Snackbar>
    );
};

export default Notification;