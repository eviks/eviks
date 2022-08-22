import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PasswordIcon from '../icons/PasswordIcon';
import ShowPasswordIcon from '../icons/ShowPasswordIcon';
import HidePasswordIcon from '../icons/HidePasswordIcon';
import { changeUserPassword } from '../../actions/auth';
import { AppContext } from '../../store/appContext';
import StyledInput from '../layout/StyledInput';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';

interface ChangePasswordForm {
  password: string;
  newPassword: string;
}

const ChangePassword: FC = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const {
    state: { auth },
  } = useContext(AppContext);

  const isGoogleUser = (auth.user?.googleId ?? '').length > 0;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = yup.object({
    password: yup
      .string()
      .test('passwordIsRequired', t('settings:errorPassword'), (value) => {
        if (!value && !isGoogleUser) {
          return false;
        }
        return true;
      }),
    newPassword: yup
      .string()
      .required(t('settings:errorNewPassword'))
      .min(6, t('settings:invalidPassword')),
  });

  const formik = useFormik<ChangePasswordForm>({
    initialValues: {
      password: '',
      newPassword: '',
    },
    validationSchema,
    onSubmit: async (values: ChangePasswordForm) => {
      const { password, newPassword } = values;

      setLoading(true);

      try {
        await changeUserPassword(auth.token ?? '', { password, newPassword });
        enqueueSnackbar(t('settings:passwordIsUpdated'), {
          variant: 'success',
          autoHideDuration: 3000,
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h2" fontSize={28} sx={{ mb: 3 }}>
        {t('settings:changePasswordTitle')}
      </Typography>
      {/* Password */}
      <StyledInput
        label={t('settings:password')}
        input={{
          id: 'password',
          name: 'password',
          value: formik.values.password,
          type: showPassword ? 'text' : 'password',
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
      {/* New password */}
      <StyledInput
        label={t('settings:newPassword')}
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
                {showNewPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        helperText={formik.touched.newPassword && formik.errors.newPassword}
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
          t('settings:changePassword')
        )}
      </Button>
    </form>
  );
};

export default ChangePassword;
