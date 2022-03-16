import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import Login from '../components/Login';
import Register from '../components/Register';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `auth-tab-${index}`,
  };
}

const Auth = () => {
  const [value, setValue] = React.useState(0);

  const { t } = useTranslation();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
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
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              height: {
                sm: 'auto',
                md: '100vh',
              },
              backgroundColor: (theme) => {
                return {
                  sm: theme.palette.background.default,
                  md: theme.palette.primary.main,
                };
              },
            }}
          >
            <Image
              src={'/illustrations/auth.svg'}
              alt="auth"
              width={500}
              height={500}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid
            container
            direction="column"
            sx={{
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
              <Login />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Register />
            </TabPanel>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Auth;
