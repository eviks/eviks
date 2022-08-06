import React, { Fragment, useState, useContext } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '../components/icons/CloseIcon';
import { verifyUser, loadUser } from '../actions/auth';
import { AppContext } from '../store/appContext';
import Failure from '../utils/errors/failure';
import ServerError from '../utils/errors/serverError';

const ReactCodeInput = dynamic(import('react-code-input'), { ssr: false });

interface ErrorAlert {
  message: string;
  open: boolean;
}

interface QueryParams {
  email: string;
}

type StringQueryParams = Record<keyof QueryParams, string>;

const Verification: NextPage = () => {
  const { dispatch } = useContext(AppContext);

  const { t } = useTranslation();

  const theme = useTheme();

  const router = useRouter();
  const { email } = router.query as StringQueryParams;

  const [pin, setPin] = useState<string>('');
  const [pinIsValid, setPinIsValid] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);

  const [errorAlert, setErrorAlert] = useState<ErrorAlert>({
    message: '',
    open: false,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    try {
      await verifyUser(email, pin)(dispatch);
      await loadUser()(dispatch);
      router.push({ pathname: '/' });
    } catch (error) {
      let errorMessage = '';
      if (error instanceof Failure) {
        errorMessage = error.message;
      } else if (error instanceof ServerError) {
        errorMessage = t('common:serverError');
      } else {
        errorMessage = t('common:unknownError');
      }
      setErrorAlert((prevState) => {
        return { ...prevState, open: true, message: errorMessage };
      });
    }

    setLoading(false);
  };

  const handleChange = (value: string) => {
    setPin(value);
    setPinIsValid(true);
  };

  const closeAlert = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorAlert((prevState) => {
      return { ...prevState, open: false, message: '' };
    });
  };

  const inputProps = {
    className: `pin ${
      theme.palette.mode === 'light' ? 'pin-light' : 'pin-dark'
    }`,
    inputStyleInvalid: {
      backgroundColor: theme.palette.mode,
    },
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
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              src={'/illustrations/verification.svg'}
              alt="verification"
              width={600}
              height={400}
            />
            <Typography variant="h4" textAlign={'center'}>
              {t('verification:verificationTitle')}
            </Typography>
            <Typography variant="body1" textAlign={'center'} sx={{ mb: 2 }}>
              {t('verification:verificationHint')}
            </Typography>
            <Box>
              <ReactCodeInput
                autoFocus={true}
                type="text"
                inputMode="numeric"
                name="pin"
                value={pin}
                onChange={handleChange}
                isValid={pinIsValid}
                fields={5}
                {...inputProps}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              disableElevation
              sx={{ mt: 2, py: 1, width: { xs: '100%', md: '40vh' } }}
            >
              {loading ? (
                <CircularProgress color="inherit" size="2rem" />
              ) : (
                t('verification:verifyButton')
              )}
            </Button>
            {errorAlert.open ? (
              <Alert
                severity="error"
                sx={{ width: '100%', mt: 2 }}
                action={
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={closeAlert}
                  >
                    <CloseIcon fontSize="inherit" sx={{ p: 0.2 }} />
                  </IconButton>
                }
              >
                {errorAlert.message}
              </Alert>
            ) : null}
          </Box>
        </form>
      </Container>
    </Fragment>
  );
};

export default Verification;
