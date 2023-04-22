import ReactDOM from "react-dom/client";
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme'







const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<div>
   <CssBaseline>
       <ThemeProvider theme={theme}>
               <App /> 
       </ThemeProvider>
    </CssBaseline>
</div>

);