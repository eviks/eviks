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
import { useRouter } from 'next/router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles/';
import { SnackbarProvider, SnackbarKey } from 'notistack';
import { loadUser } from '../../actions/auth';
import { AppContext } from '../../store/appContext';
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
  hideAppbar: boolean;
  initDarkMode: boolean;
}> = ({
  displayBottomNavigationBar,
  displaySearchBar,
  hideAppbar,
  initDarkMode,
  children,
}) => {
  const router = useRouter();

  const {
    state: { theme: appTheme },
    dispatch,
  } = useContext(AppContext);

  const [darkMode, setDarkMode] = useState(initDarkMode);

  const loadUserFromToken = useCallback(async () => {
    loadUser()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (router.pathname !== '/user_load') {
      loadUserFromToken();
    }
  }, [loadUserFromToken, router.pathname]);

  useEffect(() => {
    setDarkMode(appTheme === 'dark');
  }, [appTheme]);

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
    <Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0; viewport-fit=cover"
        />
        <meta charSet="UTF-8" />
        <meta
          name="theme-color"
          content={
            darkMode
              ? darkTheme.palette.background.default.toString()
              : lightTheme.palette.background.default.toString()
          }
        />
      </Head>
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
                <CloseIcon
                  color={'secondary'}
                  fontSize="small"
                  sx={{ p: 0.2 }}
                />
              </IconButton>
            );
          }}
        >
          <CssBaseline />
          {!hideAppbar && <StyledAppbar displaySearchBar={displaySearchBar} />}
          <Fragment>{children}</Fragment>
          {displayBottomNavigationBar && <StyledBottomNavigation />}
        </SnackbarProvider>
      </ThemeProvider>
    </Fragment>
  );
};

export default Layout;
