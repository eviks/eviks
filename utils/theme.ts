import { createTheme } from '@mui/material/styles';

const primaryColor = '#FF337A';
const lightPrimaryColor = '#FF4788';
const lightColor = '#FFFFFF';
const darkColor = '#151316';
const softDarkColor = '#342E37';

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
      main: softDarkColor,
    },
  },
});
