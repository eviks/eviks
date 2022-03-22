import React, {
  FC,
  Fragment,
  useState,
  useContext,
  useEffect,
  useCallback,
  createRef,
} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Switch from '@mui/material/Switch';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link as MaterialLink } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { SnackbarProvider, SnackbarKey } from 'notistack';
import { makeStyles } from '@mui/styles/';
import { AppContext } from '../store/appContext';
import { loadUser } from '../actions/auth';
import {
  lightTheme,
  darkTheme,
  primaryColor,
  lightPrimaryColor,
} from '../utils/theme';
import LogoIcon from './icons/LogoIcon';
import CloseIcon from './icons/CloseIcon';
import StyledBottomNavigation from './StyledBottomNavigation';

const Layout: FC<{ initDarkMode: boolean }> = ({ initDarkMode, children }) => {
  <Head>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
  </Head>;

  const { dispatch } = useContext(AppContext);

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

  const { t } = useTranslation();

  const router = useRouter();
  const [darkMode, setMode] = useState(initDarkMode);

  const darkModeToggle = () => {
    const newValue = !darkMode;
    setMode(newValue);
    Cookies.set('darkMode', newValue ? 'ON' : 'OFF');
  };

  const switchLanguage = (locale: string) => {
    Cookies.set('NEXT_LOCALE', locale);
    router.push(router.asPath, undefined, { locale });
  };

  const notistackRef = createRef<SnackbarProvider>();
  const onClickDismiss = (key: SnackbarKey) => {
    return () => {
      if (notistackRef.current) notistackRef.current.closeSnackbar(key);
    };
  };

  const useStyles = makeStyles(() => {
    return {
      variantError: {
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
          vertical: 'top',
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
                viewBox="0 0 241.171 241.171"
                fontSize="small"
                sx={{ p: 0.2 }}
              />
            </IconButton>
          );
        }}
      >
        <CssBaseline />
        <AppBar color="secondary" elevation={0}>
          <Toolbar
            sx={{
              justifyContent: 'space-between',
            }}
          >
            <Box />
            <Link href="/" passHref>
              <MaterialLink underline="none">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <LogoIcon
                    viewBox="0 0 512.001 512.001"
                    fontSize="large"
                    color="primary"
                    sx={{ mx: 1 }}
                  />
                  <Typography variant="h6" color="primary" fontSize="1.5rem">
                    Eviks
                  </Typography>
                </Box>
              </MaterialLink>
            </Link>
            <Box
              sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <Link href="/auth" passHref>
                <Button> {t('common:authButton')}</Button>
              </Link>
              <Switch checked={darkMode} onChange={darkModeToggle} />
              <div>
                {router.locales?.map((locale) => {
                  return router.locale !== locale ? (
                    <Button
                      key={locale}
                      variant="text"
                      color="inherit"
                      onClick={() => {
                        return switchLanguage(locale);
                      }}
                    >
                      {locale}
                    </Button>
                  ) : null;
                })}
              </div>
            </Box>
          </Toolbar>
        </AppBar>
        <Fragment>{children}</Fragment>
        <StyledBottomNavigation />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Layout;
