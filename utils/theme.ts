import { createTheme } from '@mui/material/styles';

export const primaryColor = '#BC0052';
export const lightPrimaryColor = '#F5006A';
export const lightColor = '#FFFFFF';
export const darkColor = '#1C1C22';
export const softDarkColor = '#342E37';

export const lightTheme = createTheme({
  typography: {
    fontSize: 13,
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: primaryColor,
      contrastText: lightColor,
    },
    secondary: {
      main: lightColor,
    },
  },
});

export const darkTheme = createTheme({
  typography: {
    fontSize: 13,
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    mode: 'dark',
    background: {
      default: darkColor,
      paper: darkColor,
    },

    primary: {
      main: lightPrimaryColor,
      contrastText: darkColor,
    },
    secondary: {
      main: softDarkColor,
    },
  },
});
