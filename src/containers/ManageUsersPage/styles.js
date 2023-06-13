import { Dialog, Paper } from '@mui/material';
import styled from 'styled-components';


export const UsersTableWrapper = styled(Paper)``;

export const UserModalWrapper = styled(Dialog)`
  .DialogActions {
    button {
      margin: 0 0.2em;
    }
  }

  .MuiDialogContent-root {
    width: 400px;
    max-width: 95vw;
  }

  .MuiDialogActions-root {
    justify-content: space-between;
  }

  .css-8oqj6-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root{
    border-bottom: 1px solid #949494 !important;
  }

  .MuiOutlinedInput-notchedOutline{
    border:none !important;
  }

  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input{
    padding: 4px 32px !important;
  }
`;
