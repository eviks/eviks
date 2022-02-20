import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ValidatorForm } from 'react-material-ui-form-validator';
import useTranslation from 'next-translate/useTranslation';
import StyledInput from './StyledInput';

const Login = () => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const { email, password } = state;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <ValidatorForm
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Typography variant="h1" fontSize={32} align="center">
        {t('auth:signInSubtitle')}
      </Typography>
      <StyledInput
        validators={['required', 'isEmail']}
        value={email}
        name="email"
        errorMessages={[t('auth:errorEmail'), t('auth:invalidEmail')]}
        label={t('auth:email')}
        input={{
          id: 'email',
          name: 'email',
          fullWidth: true,
          type: 'email',
          value: email,
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
          name: 'password',
          fullWidth: true,
          type: 'password',
          value: password,
          onChange: handleChange,
        }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        style={{ marginTop: '1rem' }}
      >
        {t('auth:loginButton')}
      </Button>
    </ValidatorForm>
  );
};

export default Login;
