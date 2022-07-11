import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { parseCookies, destroyCookie } from 'nookies';
import SettingsHeader from '../components/settings/SettingsHeader';
import PasswordChange from '../components/settings/PasswordChange';
import { loadUserOnServer } from '../actions/auth';
import { User } from '../types';

const Settings: NextPage<{ user: User }> = ({ user }) => {
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
        <PasswordChange />
      </Box>
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
