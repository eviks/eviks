import React, { FC, Fragment, useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import { useFormik } from 'formik';
import * as yup from 'yup';
import GoogleAuth from './GoogleAuth';
import StyledInput from '../layout/StyledInput';
import EmailIcon from '../icons/EmailIcon';
import PasswordIcon from '../icons/PasswordIcon';
import ShowPasswordIcon from '../icons/ShowPasswordIcon';
import HidePasswordIcon from '../icons/HidePasswordIcon';
import CloseIcon from '../icons/CloseIcon';
import { AppContext } from '../../store/appContext';
import { loadUser, loginUser } from '../../actions/auth';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';
import { ErrorAlert } from '../../types';

interface LoginForm {
  email: string;
  password: string;
}

const Login: FC<{ redirect: boolean }> = ({ redirect }) => {
  const {
    state: {
      auth: { user },
    },
    dispatch,
  } = useContext(AppContext);

  const { t } = useTranslation();

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [errorAlert, setErrorAlert] = useState<ErrorAlert>({
    message: '',
    open: false,
  });

  useEffect(() => {
    if (user) {
      if (user.role === 'moderator') {
        router.push({ pathname: '/post_review' });
      } else if (redirect) {
        router.push({ pathname: '/' });
      }
    }
  }, [redirect, router, user]);

  const validationSchema = yup.object({
    email: yup
      .string()
      .required(t('auth:errorEmail'))
      .email(t('auth:invalidEmail')),
    password: yup.string().required(t('auth:errorPassword')),
  });

  const formik = useFormik<LoginForm>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values: LoginForm) => {
      const { email, password } = values;

      setLoading(true);

      try {
        await loginUser(email, password)(dispatch);
        await loadUser()(dispatch);
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
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h1" fontSize={32} align="center">
          {t('auth:signInSubtitle')}
        </Typography>
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
            error: formik.touched.email && Boolean(formik.errors.email),
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
            error: formik.touched.password && Boolean(formik.errors.password),
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
            t('auth:loginButton')
          )}
        </Button>
        <Link href="/reset_password" passHref>
          <Button variant="text" fullWidth sx={{ mt: 2 }}>
            {t('auth:oopsforgotPassword')}
          </Button>
        </Link>
        {errorAlert.open ? (
          <Alert
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
      <Divider sx={{ mt: 1 }}>{t('auth:loginOr')}</Divider>
      <GoogleAuth redirect={redirect} />
    </Fragment>
  );
};

export default Login;
