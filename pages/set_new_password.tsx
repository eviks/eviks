import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useSnackbar } from 'notistack';
import { ValidatorForm } from 'react-material-ui-form-validator';
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

interface SetNewPasswordState {
  newPassword: string;
  showNewPassword: boolean;
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
  const [data, setData] = useState<SetNewPasswordState>({
    newPassword: '',
    showNewPassword: false,
  });

  const { newPassword, showNewPassword } = data;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleClickShowNewPassword = () => {
    setData((prevState) => {
      return { ...prevState, showNewPassword: !prevState.showNewPassword };
    });
  };

  return (
    <Container
      sx={{
        mt: 12,
        mb: 10,
      }}
    >
      <ValidatorForm onSubmit={handleSubmit}>
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
            validators={['required', 'minStringLength:6']}
            value={newPassword}
            name="newPassword"
            errorMessages={[
              t('auth:errorNewPassword'),
              t('auth:invalidPassword'),
            ]}
            label={t('auth:newPassword')}
            input={{
              id: 'newPassword',
              autoComplete: 'on',
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
                    {showNewPassword ? (
                      <HidePasswordIcon />
                    ) : (
                      <ShowPasswordIcon />
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
      </ValidatorForm>
    </Container>
  );
};

export default SetNewPassword;
