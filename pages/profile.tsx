import React, { FC, Fragment, useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import Cookies from 'js-cookie';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import ThemeSwitch from '../components/layout/ThemeSwitch';
import BookmarkIcon from '../components/icons/BookmarkIcon';
import LoginIcon from '../components/icons/LoginIcon';
import LogoutIcon from '../components/icons/LogoutIcon';
import NextIcon from '../components/icons/NextIcon';
import UserIcon from '../components/icons/UserIcon';
import { logout } from '../actions/auth';
import { setTheme } from '../actions/theme';
import { AppContext } from '../store/appContext';
import { CustomNextPage } from '../types';

const ProfileButton: FC<{
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  label: string;
  icon: JSX.Element;
}> = ({ onClick, label, icon }) => {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      sx={{
        width: '100%',
        border: '1px solid',
        borderColor:
          theme.palette.mode === 'light' ? theme.palette.grey[300] : null,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 3,
        py: 2,
        borderRadius: 10,
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {icon}
        {label}
      </Box>
      <NextIcon />
    </Button>
  );
};

const Profile: CustomNextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    state: {
      auth: { user, isInit },
      theme: appTheme,
    },
    dispatch,
  } = useContext(AppContext);

  const handleLogout = () => {
    logout()(dispatch);
  };

  const [options, setOptions] = useState<
    { label: string; icon: JSX.Element; route: string }[]
  >([]);

  useEffect(() => {
    const loggedInOptions = [
      {
        label: t('common:myPosts'),
        icon: <BookmarkIcon />,
        route: '/user_posts',
      },
      {
        label: t('common:profile'),
        icon: <UserIcon />,
        route: '/settings',
      },
    ];

    const loggedOutOptions = [
      {
        label: t('common:authButton'),
        icon: <LoginIcon />,
        route: '/auth',
      },
    ];

    if (user && isInit) {
      setOptions(loggedInOptions);
    } else {
      setOptions(loggedOutOptions);
    }
  }, [isInit, t, user]);

  const darkModeToggle = () => {
    const newValue = appTheme === 'dark' ? 'light' : 'dark';
    setTheme(newValue)(dispatch);
  };

  const switchLanguage = (locale: string) => {
    Cookies.set('NEXT_LOCALE', locale, { expires: 365 });
    router.push(router.asPath, undefined, { locale });
  };

  return (
    <Fragment>
      <Head>
        <title>{t(`common:projectTitle`)}</title>
      </Head>
      <Container
        sx={{
          mt: 12,
          mb: 10,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
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
          {/* Theme switcher */}
          <ThemeSwitch
            checked={appTheme === 'dark'}
            onChange={darkModeToggle}
            sx={{ mr: 2 }}
          />
        </Box>
        {options?.map((option) => {
          return (
            <Link href={option.route} passHref key={option.route}>
              <ProfileButton
                onClick={undefined}
                label={option.label}
                icon={option.icon}
              />
            </Link>
          );
        })}
        {user && isInit && (
          <ProfileButton
            onClick={handleLogout}
            label={t('common:logout')}
            icon={<LogoutIcon />}
          />
        )}
      </Container>
    </Fragment>
  );
};

Profile.displayBottomNavigationBar = true;

export default Profile;
