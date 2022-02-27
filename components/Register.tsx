import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { ValidatorForm } from 'react-material-ui-form-validator';
import useTranslation from 'next-translate/useTranslation';
import StyledInput from './StyledInput';
import ShowPassword from './icons/ShowPassword';
import HidePassword from './icons/HidePassword';

interface RegisterState {
  displayName: string;
  email: string;
  password: string;
  showPassword: boolean;
}

const Register = () => {
  const { t } = useTranslation();

  const [state, setState] = useState<RegisterState>({
    displayName: '',
    email: '',
    password: '',
    showPassword: false,
  });

  const { displayName, email, password, showPassword } = state;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleClickShowPassword = () => {
    setState((prevState) => {
      return { ...prevState, showPassword: !prevState.showPassword };
    });
  };

  return (
    <ValidatorForm
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
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
        style={{ marginTop: '1rem' }}
      >
        {t('auth:registerButton')}
      </Button>
    </ValidatorForm>
  );
};

export default Register;
