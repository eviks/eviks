import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { CustomNextPage } from '../types';

const UserLoad: CustomNextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { token } = router.query;
    if (window.opener) {
      window.opener.postMessage({ token, source: 'login-redirect' });
      window.close();
    }
  });

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <CircularProgress color="primary" size="2rem" />
    </Container>
  );
};

UserLoad.hideAppbar = true;

export default UserLoad;
