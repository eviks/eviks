import React, { useEffect, useContext } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { parseCookies, destroyCookie } from 'nookies';
import SettingsHeader from '../components/settings/SettingsHeader';
import UpdateUser from '../components/settings/UpdateUser';
import ChangePassword from '../components/settings/ChangePassword';
import DeleteUser from '../components/settings/DeleteUser';
import { AppContext } from '../store/appContext';
import { loadUserOnServer } from '../actions/auth';
import { User } from '../types';

const Settings: NextPage<{ user: User }> = ({ user }) => {
  const router = useRouter();

  const {
    state: { auth },
  } = useContext(AppContext);

  useEffect(() => {
    if (!auth.user && auth.isInit) router.push({ pathname: '/', query: {} });
  }, [auth.isInit, auth.user, router]);

  return (
    <Container
      sx={{
        mt: 12,
        mb: 6,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SettingsHeader user={user} />
      <Divider sx={{ width: '100%', my: 3 }} />
      <Box sx={{ width: { xs: '100%', md: '70%' } }}>
        <Box sx={{ mb: 5 }}>
          <UpdateUser user={user} />
        </Box>
        <Box sx={{ mb: 5 }}>
          <ChangePassword />
        </Box>
      </Box>
      <DeleteUser />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const user = await loadUserOnServer(token);
  if (!user) {
    destroyCookie(context, 'token', {
      path: '/',
    });
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
};

export default Settings;
