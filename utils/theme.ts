import { createTheme } from '@mui/material/styles';

const primaryColor = '#FF337A';
const lightPrimaryColor = '#FF4788';
const lightColor = '#FFFFFF';
const lightGreyColor = '#D8D8D8';
const darkColor = '#151316';

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
    background: {
      default: darkColor,
    },
    primary: {
      main: lightPrimaryColor,
    },
    secondary: {
      main: lightGreyColor,
    },
  },
});
