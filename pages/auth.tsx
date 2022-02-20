import React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import Login from '../components/Login';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const StyledPaper = styled(Paper)(({ theme }) => {
  return {
    [theme.breakpoints.down('md')]: {
      padding: '0',
    },
    [theme.breakpoints.up('md')]: {
      padding: '2rem',
    },
  };
});

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

const Register = () => {
  return <div> Register</div>;
};

const Auth = () => {
  const [value, setValue] = React.useState(0);

  const { t } = useTranslation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <StyledPaper elevation={1}>
      <Grid container>
        <Grid item xs={0} md={6}>
          <Image
            src={'/illustrations/auth.png'}
            alt="test"
            width={400}
            height={400}
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
    </StyledPaper>
  );
};

export default Auth;
