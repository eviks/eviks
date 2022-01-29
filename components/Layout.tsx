import React, { FC, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { lightTheme, darkTheme } from '../utils/theme';

const Layout: FC<{ initDarkMode: boolean }> = ({ initDarkMode, children }) => {
  <Head>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
  </Head>;

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
      <AppBar>
        <Toolbar>
          <Switch checked={darkMode} onChange={darkModeToggle} />
          <div>
            {router.locales?.map((locale) => {
              return router.locale !== locale ? (
                <Button
                  key={locale}
                  variant="text"
                  color="secondary"
                  onClick={() => {
                    return switchLanguage(locale);
                  }}
                >
                  {locale}
                </Button>
              ) : null;
            })}
          </div>
        </Toolbar>
      </AppBar>
      <Box sx={{ my: 10 }} />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
