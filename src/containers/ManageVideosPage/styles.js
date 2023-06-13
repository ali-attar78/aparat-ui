import { Dialog, Paper } from '@mui/material';
import styled from 'styled-components';

export const VideosTableWrapper = styled(Paper)``;

export const VideoModalWrapper = styled(Dialog)`
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
`;
