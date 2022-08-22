import React, { FC, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useFormik } from 'formik';
import * as yup from 'yup';
import StyledInput from '../layout/StyledInput';
import UserIcon from '../icons/UserIcon';
import EmailIcon from '../icons/EmailIcon';
import PasswordIcon from '../icons/PasswordIcon';
import ShowPasswordIcon from '../icons/ShowPasswordIcon';
import HidePasswordIcon from '../icons/HidePasswordIcon';
import CloseIcon from '../icons/CloseIcon';
import { registerUser } from '../../actions/auth';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';

interface RegisterForm {
  displayName: string;
  email: string;
  password: string;
}

interface ErrorAlert {
  message: string;
  open: boolean;
}

const Register: FC = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [errorAlert, setErrorAlert] = useState<ErrorAlert>({
    message: '',
    open: false,
  });

  const validationSchema = yup.object({
    displayName: yup.string().required(t('common:errorRequiredField')),
    email: yup
      .string()
      .required(t('auth:errorEmail'))
      .email(t('auth:invalidEmail')),
    password: yup
      .string()
      .required(t('auth:errorPassword'))
      .min(6, t('auth:invalidPassword')),
  });

  const formik = useFormik<RegisterForm>({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values: RegisterForm) => {
      const { displayName, email, password } = values;

      setLoading(true);

      try {
        await registerUser(displayName, email, password);
        router.push({ pathname: '/verification', query: { email } });
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
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h1" fontSize={32} align="center">
        {t('auth:signUpSubtitle')}
      </Typography>
      <StyledInput
        label={t('auth:displayName')}
        input={{
          id: 'displayName',
          name: 'displayName',
          value: formik.values.displayName,
          type: 'text',
          fullWidth: true,
          onChange: formik.handleChange,
          startAdornment: (
            <InputAdornment position="start">
              <UserIcon sx={{ ml: 1 }} />
            </InputAdornment>
          ),
        }}
        helperText={formik.touched.displayName && formik.errors.displayName}
      />
      <StyledInput
        label={t('auth:email')}
        input={{
          id: 'email',
          name: 'email',
          value: formik.values.email,
          type: 'email',
          fullWidth: true,
          onChange: formik.handleChange,
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon sx={{ ml: 1 }} />
            </InputAdornment>
          ),
        }}
        helperText={formik.touched.email && formik.errors.email}
      />
      <StyledInput
        label={t('auth:password')}
        input={{
          id: 'password',
          name: 'password',
          value: formik.values.password,
          type: showPassword ? 'text' : 'password',
          fullWidth: true,
          autoComplete: 'on',
          onChange: formik.handleChange,
          startAdornment: (
            <InputAdornment position="start">
              <PasswordIcon sx={{ ml: 1 }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                size="small"
                sx={{ mr: 1 }}
                onClick={handleClickShowPassword}
              >
                {showPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        disableElevation
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
          action={
            <IconButton aria-label="close" size="small" onClick={closeAlert}>
              <CloseIcon fontSize="inherit" sx={{ p: 0.2 }} />
            </IconButton>
          }
        >
          {errorAlert.message}
        </Alert>
      ) : null}
    </form>
  );
};

export default Register;
