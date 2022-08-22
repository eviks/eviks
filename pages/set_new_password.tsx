import React, { Fragment, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import StyledInput from '../components/layout/StyledInput';
import PasswordIcon from '../components/icons/PasswordIcon';
import HidePasswordIcon from '../components/icons/HidePasswordIcon';
import ShowPasswordIcon from '../components/icons/ShowPasswordIcon';
import { resetPassword, loadUser } from '../actions/auth';
import { AppContext } from '../store/appContext';
import Failure from '../utils/errors/failure';
import ServerError from '../utils/errors/serverError';
import { CustomNextPage } from '../types';

interface SetNewPasswordForm {
  newPassword: string;
}

interface QueryParams {
  email: string;
  resetPasswordToken: string;
}

type StringQueryParams = Record<keyof QueryParams, string>;

const SetNewPassword: CustomNextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { dispatch } = useContext(AppContext);

  const { email, resetPasswordToken } = router.query as StringQueryParams;

  const [loading, setLoading] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const validationSchema = yup.object({
    newPassword: yup
      .string()
      .required(t('auth:errorPassword'))
      .min(6, t('auth:invalidPassword')),
  });

  const formik = useFormik<SetNewPasswordForm>({
    initialValues: {
      newPassword: '',
    },
    validationSchema,
    onSubmit: async (values: SetNewPasswordForm) => {
      const { newPassword } = values;

      setLoading(true);

      try {
        await resetPassword(email, resetPasswordToken, newPassword)(dispatch);
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
        enqueueSnackbar(errorMessage, {
          variant: 'error',
          autoHideDuration: 3000,
        });
      }

      setLoading(false);
    },
  });

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
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
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              margin: 'auto',
              flexDirection: 'column',
              width: { xs: 'auto', md: '40vw' },
            }}
          >
            {/* New password */}
            <StyledInput
              label={t('auth:newPassword')}
              input={{
                id: 'newPassword',
                name: 'newPassword',
                value: formik.values.newPassword,
                type: showNewPassword ? 'text' : 'password',
                autoComplete: 'on',
                fullWidth: true,
                onChange: formik.handleChange,
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon sx={{ ml: 1 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle new password visibility"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={handleClickShowNewPassword}
                    >
                      {showNewPassword ? (
                        <HidePasswordIcon />
                      ) : (
                        <ShowPasswordIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disableElevation
              disabled={loading}
              sx={{ mt: 1, py: 1 }}
            >
              {loading ? (
                <CircularProgress color="inherit" size="2rem" />
              ) : (
                t('auth:setNewPassword')
              )}
            </Button>
          </Box>
        </form>
      </Container>
    </Fragment>
  );
};

export default SetNewPassword;
