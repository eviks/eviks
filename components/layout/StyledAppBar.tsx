import React, { FC, Fragment, useState, useContext, useRef } from 'react';
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
import ModalAuth from '../auth/ModalAuth';
import SearchBar from '../posts/searchBar/SearchBar';
import UserMenu from '../UserMenu';
import { AppContext } from '../../store/appContext';
import LogoIcon from '../icons/LogoIcon';
import PlusIcon from '../icons/PlusIcon';
import HeartIcon from '../icons/HeartIcon';
import useWindowSize from '../../utils/hooks/useWindowSize';

const StyledAppbar: FC<{
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  displaySearchBar: boolean;
}> = ({ darkMode, setDarkMode, displaySearchBar }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const theme = useTheme();
  const { width } = useWindowSize();

  const appBarRef = useRef(null);

  const lgScreen = (width && width > 1480) || false;

  const {
    state: {
      auth: { user, isInit },
    },
  } = useContext(AppContext);

  const darkModeToggle = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    Cookies.set('darkMode', newValue ? 'ON' : 'OFF', { expires: 365 });
  };

  const switchLanguage = (locale: string) => {
    Cookies.set('NEXT_LOCALE', locale, { expires: 365 });
    router.push(router.asPath, undefined, { locale });
  };

  const [open, setOpen] = useState<boolean>(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <AppBar
        ref={appBarRef}
        position={!displaySearchBar ? 'fixed' : 'relative'}
        color={'transparent'}
        variant={'outlined'}
        elevation={0}
        sx={{
          borderBottom: displaySearchBar ? 'none' : null,
          backdropFilter: 'blur(20px)',
          backgroundColor: alpha(theme.palette.background.default, 0.7),
        }}
      >
        <Toolbar
          sx={{
            justifyContent: {
              md: lgScreen ? 'end' : 'space-between',
              xs: 'center',
            },
          }}
        >
          {/* Logo */}
          <Link href="/" passHref>
            <MaterialLink
              underline="none"
              sx={{
                position: lgScreen ? 'absolute' : 'initial',
                top: lgScreen ? '50%' : 'auto',
                left: lgScreen ? '50%' : 'auto',
                transform: lgScreen ? 'translate(-50%, -50%)' : 'auto',
              }}
            >
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
              {/* Theme switch */}
              <Switch
                checked={darkMode}
                onChange={darkModeToggle}
                sx={{ mr: 2 }}
              />
              {/* Favorites */}
              {!user && isInit ? (
                <Button
                  startIcon={<HeartIcon />}
                  onClick={() => {
                    setOpen(true);
                  }}
                  sx={{ mr: 4 }}
                >
                  {t('common:favorites')}
                </Button>
              ) : (
                <Link href="/favorites" passHref>
                  <Button startIcon={<HeartIcon />} sx={{ mr: 4 }}>
                    {t('common:favorites')}
                  </Button>
                </Link>
              )}
              {/* New post */}
              {!user && isInit ? (
                <Button
                  variant={'contained'}
                  startIcon={<PlusIcon />}
                  disableElevation
                  onClick={() => {
                    setOpen(true);
                  }}
                  sx={{ mr: 4 }}
                >
                  {t('common:createPost')}
                </Button>
              ) : (
                <Link href="/edit_post" passHref>
                  <Button
                    variant={'contained'}
                    startIcon={<PlusIcon />}
                    disableElevation
                    sx={{ mr: 4 }}
                  >
                    {t('common:createPost')}
                  </Button>
                </Link>
              )}
              {/* User menu / auth button */}
              {user ? (
                <UserMenu user={user} />
              ) : (
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  {t('common:authButton')}
                </Button>
              )}
              {/* Language */}
              <Box sx={{ mx: 2 }}>
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
            </Hidden>
          </Box>
        </Toolbar>
      </AppBar>
      {displaySearchBar && <SearchBar appBarRef={appBarRef} />}
      <ModalAuth open={open} onClose={onClose} />
    </Fragment>
  );
};

export default StyledAppbar;
