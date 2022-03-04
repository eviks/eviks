import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { ValidatorForm } from 'react-material-ui-form-validator';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import StyledInput from './StyledInput';
import ShowPassword from './icons/ShowPassword';
import HidePassword from './icons/HidePassword';
import { registerUser } from '../actions/auth';
import Failure from '../utils/failure';
import ServerError from '../utils/serverError';

interface RegisterState {
  displayName: string;
  email: string;
  password: string;
  showPassword: boolean;
}

interface ErrorAlert {
  message: string;
  open: boolean;
}

const Register = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const [data, setData] = useState<RegisterState>({
    displayName: '',
    email: '',
    password: '',
    showPassword: false,
  });

  const { displayName, email, password, showPassword } = data;

  const [loading, setLoading] = useState<boolean>(false);

  const [errorAlert, setErrorAlert] = useState<ErrorAlert>({
    message: '',
    open: false,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    try {
      await registerUser({ displayName, email, password });
      router.push('/');
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleClickShowPassword = () => {
    setData((prevState) => {
      return { ...prevState, showPassword: !prevState.showPassword };
    });
  };

  const closeAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorAlert((prevState) => {
      return { ...prevState, open: false, message: '' };
    });
  };

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <Typography variant="h1" fontSize={32} align="center">
        {t('auth:signUpSubtitle')}
      </Typography>
      <StyledInput
        validators={['required']}
        value={displayName}
        name="displayName"
        errorMessages={[t('common:errorRequiredField')]}
        label={t('auth:displayName')}
        input={{
          id: 'displayName',
          fullWidth: true,
          type: 'text',
          onChange: handleChange,
        }}
      />
      <StyledInput
        validators={['required', 'isEmail']}
        value={email}
        name="email"
        errorMessages={[t('auth:errorEmail'), t('auth:invalidEmail')]}
        label={t('auth:email')}
        input={{
          id: 'email',
          fullWidth: true,
          type: 'email',
          onChange: handleChange,
        }}
      />
      <StyledInput
        validators={['required', 'minStringLength:6']}
        value={password}
        name="password"
        errorMessages={[t('auth:errorPassword'), t('auth:invalidPassword')]}
        label={t('auth:password')}
        input={{
          id: 'password',
          fullWidth: true,
          type: showPassword ? 'text' : 'password',
          onChange: handleChange,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {showPassword ? (
                  <HidePassword width={'24px'} height={'24px'} />
                ) : (
                  <ShowPassword width={'24px'} height={'24px'} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ mt: 1, py: 1 }}
      >
        {loading ? (
          <CircularProgress color="inherit" size="2rem" />
        ) : (
          t('auth:registerButton')
        )}
      </Button>
      {errorAlert.open ? (
        <Alert
          onClose={closeAlert}
          severity="error"
          sx={{ width: '100%', mt: 2 }}
        >
          {errorAlert.message}
        </Alert>
      ) : null}
    </ValidatorForm>
  );
};

export default Register;
