import React, { Fragment, useState } from 'react';
import Image from 'next/image';
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
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import StyledInput from '../components/layout/StyledInput';
import EmailIcon from '../components/icons/EmailIcon';
import { createResetPasswordToken } from '../actions/auth';
import Failure from '../utils/errors/failure';
import ServerError from '../utils/errors/serverError';
import { CustomNextPage } from '../types';

interface ResetPasswordForm {
  email: string;
}

const ResetPassword: CustomNextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = yup.object({
    email: yup
      .string()
      .required(t('common:errorRequiredField'))
      .email(t('common:invalidEmail')),
  });

  const formik = useFormik<ResetPasswordForm>({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values: ResetPasswordForm) => {
      const { email } = values;

      setLoading(true);

      try {
        await createResetPasswordToken(email);
        router.push({
          pathname: '/reset_password_verification',
          query: { email },
        });
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src={'/illustrations/reset_password.svg'}
            alt="reset_password"
            width={500}
            height={500}
          />
          <Typography variant="h4" textAlign={'center'}>
            {t('auth:resetPasswordTitle')}
          </Typography>
          <Typography variant="subtitle1" textAlign={'center'}>
            {t('auth:resetPasswordHint')}
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              mt: 3,
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              width: { xs: 'auto', md: '40vw' },
            }}
          >
            {/* Email */}
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
                t('auth:resetPasswordButton')
              )}
            </Button>
          </Box>
        </form>
      </Container>
    </Fragment>
  );
};

export default ResetPassword;
