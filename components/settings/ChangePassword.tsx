import React, { FC, useState, useEffect, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSnackbar } from 'notistack';
import { ValidatorForm } from 'react-material-ui-form-validator';
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

interface ChangePasswordState {
  password: string;
  newPassword: string;
  showPassword: boolean;
  showNewPassword: boolean;
}

const ChangePassword: FC = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const {
    state: { auth },
  } = useContext(AppContext);

  const isGoogleUser = (auth.user?.googleId ?? '').length > 0;

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ChangePasswordState>({
    password: '',
    newPassword: '',
    showPassword: false,
    showNewPassword: false,
  });

  const { password, newPassword, showPassword, showNewPassword } = data;

  useEffect(() => {
    ValidatorForm.addValidationRule('passwordRequired', (value) => {
      if (!value && !isGoogleUser) {
        return false;
      }
      return true;
    });

    return () => {
      ValidatorForm.removeValidationRule('passwordRequired');
      ValidatorForm.removeValidationRule('newPasswordRequired');
      ValidatorForm.removeValidationRule('newPasswordIsValid');
    };
  }, [isGoogleUser, newPassword, password]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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

  const handleClickShowNewPassword = () => {
    setData((prevState) => {
      return { ...prevState, showNewPassword: !prevState.showNewPassword };
    });
  };

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <Typography variant="h2" fontSize={28} sx={{ mb: 3 }}>
        {t('settings:changePasswordTitle')}
      </Typography>
      {/* Password */}
      <StyledInput
        validators={['passwordRequired']}
        value={password}
        name="password"
        errorMessages={[t('settings:errorPassword')]}
        label={t('settings:password')}
        input={{
          id: 'password',
          fullWidth: true,
          type: showPassword ? 'text' : 'password',
          onChange: handleChange,
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
      />
      {/* New password */}
      <StyledInput
        validators={['required', 'minStringLength:6']}
        value={newPassword}
        name="newPassword"
        errorMessages={[
          t('settings:errorNewPassword'),
          t('settings:invalidPassword'),
        ]}
        label={t('settings:newPassword')}
        input={{
          id: 'newPassword',
          fullWidth: true,
          type: showNewPassword ? 'text' : 'password',
          onChange: handleChange,
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
    </ValidatorForm>
  );
};

export default ChangePassword;
