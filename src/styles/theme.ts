import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      light: '#fff5f6',
      dark: '#e5384f',
    },
    text: {
      primary: '#000000',
      secondary: '#fd3b31',
    },
  },
  typography: {
    fontFamily: "'Roboto',sans-serif",
  },
});

export default theme;
