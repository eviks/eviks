import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSnackbar } from 'notistack';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import UserIcon from '../icons/UserIcon';
import { updateUser } from '../../actions/auth';
import { AppContext } from '../../store/appContext';
import StyledInput from '../layout/StyledInput';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';
import { User } from '../../types';

interface UpdateUserState {
  displayName: string;
}

const UpdateUser: FC<{ user: User }> = ({ user }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const {
    state: { auth },
  } = useContext(AppContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<UpdateUserState>({
    displayName: user?.displayName ?? '',
  });

  const { displayName } = data;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    try {
      await updateUser(auth.token ?? '', { displayName });
      enqueueSnackbar(t('settings:profileIsUpdated'), {
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

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <Typography variant="h2" fontSize={28} sx={{ mb: 3 }}>
        {t('settings:profile')}
      </Typography>
      {/* Display name */}
      <StyledInput
        validators={['required']}
        value={displayName}
        name="displayName"
        errorMessages={[t('common:errorRequiredField')]}
        label={t('settings:displayName')}
        input={{
          id: 'displayName',
          fullWidth: true,
          type: 'text',
          onChange: handleChange,
          startAdornment: (
            <InputAdornment position="start">
              <UserIcon sx={{ ml: 1 }} />
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
          t('settings:updateProfile')
        )}
      </Button>
    </ValidatorForm>
  );
};

export default UpdateUser;
