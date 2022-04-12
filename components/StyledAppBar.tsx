import React, { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import { Link as MaterialLink } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import Cookies from 'js-cookie';
import UserMenu from './UserMenu';
import { AppContext } from '../store/appContext';
import LogoIcon from './icons/LogoIcon';
import PlusIcon from './icons/PlusIcon';

const StyledAppbar: FC<{
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ darkMode, setDarkMode }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const theme = useTheme();

  const {
    state: { auth },
  } = useContext(AppContext);

  const darkModeToggle = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    Cookies.set('darkMode', newValue ? 'ON' : 'OFF');
  };

  const switchLanguage = (locale: string) => {
    Cookies.set('NEXT_LOCALE', locale);
    router.push(router.asPath, undefined, { locale });
  };

  return (
    <AppBar
      color={'transparent'}
      variant={'outlined'}
      elevation={0}
      sx={{
        backdropFilter: 'blur(20px)',
        backgroundColor: alpha(theme.palette.background.default, 0.7),
      }}
    >
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
              <LogoIcon fontSize="large" color="primary" sx={{ mx: 1 }} />
              <Typography variant="h6" color="primary" fontSize="1.5rem">
                Eviks
              </Typography>
            </Box>
          </MaterialLink>
        </Link>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <Hidden mdDown>
            <Box sx={{ mr: 2 }}>
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
            </Box>
            <Switch
              checked={darkMode}
              onChange={darkModeToggle}
              sx={{ mr: 2 }}
            />
            <Link href="/edit_post" passHref>
              <Button
                variant={'contained'}
                startIcon={<PlusIcon sx={{ fontSize: '0.85rem !important' }} />}
                sx={{ mx: 4 }}
              >
                {t('common:createPost')}
              </Button>
            </Link>
            {auth.user ? (
              <UserMenu user={auth.user} />
            ) : (
              <Link href="/auth" passHref>
                <Button> {t('common:authButton')}</Button>
              </Link>
            )}
          </Hidden>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default StyledAppbar;
