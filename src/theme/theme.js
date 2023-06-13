
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl',

    palette: {
      primary: {
        main: '#3f51b5',
      },
      danger: {
        main: '#E50057',
      },  
      info: {
        main: '#6B6B6B',
      }, 
      gray: {
        main: '#6B6B6B',
      }, 
      error: {
        main: '#E50057',
      }, 
    },
    typography: {
      fontFamily: 'IRANSans, Roboto, Helvetica, Arial, sans-serif',
      fontSize: 11,
    },
    overrides: {
      MuiPaper: {
        root: {
          border: 'none'

        },
        elevation1: {
          boxShadow: '0px 1px 1px 0px rgba(0,0,0,0.1)',
          border: '1px solid #fff',
          borderBottom: 'none',
          borderRadius: '2px',
        },
      },
    },



  });


  export default theme;