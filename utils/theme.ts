import { createTheme } from '@mui/material/styles';

const primaryColor = '#FF337A';
const lightPrimaryColor = '#FF4788';
const lightColor = '#FFFFFF';
const lightGreyColor = '#D8D8D8';
const darkColor = '#342E37';

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: lightColor,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: lightPrimaryColor,
      contrastText: darkColor,
    },
    secondary: {
      main: lightGreyColor,
    },
  },
});
