import React, {
  FC,
  Fragment,
  useState,
  useContext,
  useEffect,
  useCallback,
  createRef,
} from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles/';
import { SnackbarProvider, SnackbarKey } from 'notistack';
import { AppContext } from '../../store/appContext';
import { loadUser } from '../../actions/auth';
import StyledAppbar from './StyledAppBar';
import {
  lightTheme,
  darkTheme,
  primaryColor,
  lightPrimaryColor,
} from '../../utils/theme';
import CloseIcon from '../icons/CloseIcon';
import StyledBottomNavigation from './StyledBottomNavigation';

const Layout: FC<{
  displayBottomNavigationBar: boolean;
  displaySearchBar: boolean;
  initDarkMode: boolean;
}> = ({
  displayBottomNavigationBar,
  displaySearchBar,
  initDarkMode,
  children,
}) => {
  <Head>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
  </Head>;

  const { dispatch } = useContext(AppContext);

  const [darkMode, setDarkMode] = useState(initDarkMode);

  const loadUserFromToken = useCallback(async () => {
    try {
      await loadUser()(dispatch);
    } catch (error) {
      //
    }
  }, [dispatch]);

  useEffect(() => {
    loadUserFromToken();
  }, [loadUserFromToken]);

  const notistackRef = createRef<SnackbarProvider>();
  const onClickDismiss = (key: SnackbarKey) => {
    return () => {
      if (notistackRef.current) notistackRef.current.closeSnackbar(key);
    };
  };

  const useStyles = makeStyles(() => {
    return {
      variantError: {
        marginBottom: '2rem',
        backgroundColor: `${
          darkMode ? lightPrimaryColor : primaryColor
        } !important`,
      },
    };
  });
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <SnackbarProvider
        ref={notistackRef}
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        hideIconVariant={true}
        classes={{
          variantError: classes.variantError,
        }}
        action={(key) => {
          return (
            <IconButton onClick={onClickDismiss(key)}>
              <CloseIcon color={'secondary'} fontSize="small" sx={{ p: 0.2 }} />
            </IconButton>
          );
        }}
      >
        <CssBaseline />
        <StyledAppbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          displaySearchBar={displaySearchBar}
        />
        <Fragment>{children}</Fragment>
        {displayBottomNavigationBar && <StyledBottomNavigation />}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Layout;
