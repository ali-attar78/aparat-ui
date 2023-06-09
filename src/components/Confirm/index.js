import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function Confirm({
  children,
  title,
  open,
  okTitle,
  cancelTitle,
  onOk,
  onCancel,
}) {
  return (
    <Dialog 
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { maxWidth: 'xs', width: 450 } }}    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="danger" autoFocus>
          {cancelTitle}
        </Button>
        <Button onClick={onOk} color="primary" variant="outlined">
          {okTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Confirm.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  okTitle: PropTypes.string,
  cancelTitle: PropTypes.string,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

Confirm.defaultProps = {
  okTitle: 'تایید',
  cancelTitle: 'انصراف',
};

export default memo(Confirm);
