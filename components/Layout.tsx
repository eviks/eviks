import React, { FC, Fragment, useState } from 'react';
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
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link as MaterialLink } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { lightTheme, darkTheme } from '../utils/theme';
import Logo from './icons/Logo';

const Layout: FC<{ initDarkMode: boolean }> = ({ initDarkMode, children }) => {
  <Head>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
  </Head>;

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

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppBar color="secondary">
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
                <Logo
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
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
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
    </ThemeProvider>
  );
};

export default Layout;
