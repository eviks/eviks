import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { CustomNextPage } from '../types';

const UserLoad: CustomNextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const { token } = router.query;
    if (window.opener) {
      window.opener.postMessage({ token, source: 'login-redirect' });
      window.close();
    }
  });

  return (
    <Fragment>
      <Head>
        <title>{t(`common:projectTitle`)}</title>
      </Head>
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
    </Fragment>
  );
};

UserLoad.hideAppbar = true;

export default UserLoad;
