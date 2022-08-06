import React, { Fragment, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import TabPanel from '../components/layout/TabPanel';
import { CustomNextPage } from '../types';

function a11yProps(index: number) {
  return {
    id: `auth-tab-${index}`,
  };
}

const Auth: CustomNextPage = () => {
  const { t } = useTranslation();

  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Head>
        <title>{t(`common:projectTitle`)}</title>
      </Head>
      <Container maxWidth={false} disableGutters>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            marginTop: {
              xs: 5,
              md: 0,
            },
          }}
        >
          <Grid item xs={0} md={6}>
            <Box
              sx={{
                height: {
                  sm: 'auto',
                  md: '100vh',
                },
                backgroundImage: 'url(/img/auth_background.jpg)',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid
              container
              direction="column"
              sx={{
                mt: { xs: 4, md: 0 },
                maxWidth: {
                  md: 'auto',
                  lg: '40vw',
                },
                m: 'auto',
              }}
            >
              <Tabs value={value} onChange={handleChange} variant="fullWidth">
                <Tab label={t('auth:signInTitle')} {...a11yProps(0)} />
                <Tab label={t('auth:signUpTitle')} {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Login redirect={true} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Register />
              </TabPanel>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

Auth.hideAppbar = true;

export default Auth;
