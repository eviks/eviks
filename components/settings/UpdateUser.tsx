import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as yup from 'yup';
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

interface UpdateUserForm {
  displayName: string;
}

const UpdateUser: FC<{ user: User }> = ({ user }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const {
    state: { auth },
  } = useContext(AppContext);

  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = yup.object({
    displayName: yup.string().required(t('common:errorRequiredField')),
  });

  const formik = useFormik<UpdateUserForm>({
    initialValues: {
      displayName: user?.displayName ?? '',
    },
    validationSchema,
    onSubmit: async (values: UpdateUserForm) => {
      const { displayName } = values;

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
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h2" fontSize={28} sx={{ mb: 3 }}>
        {t('settings:profile')}
      </Typography>
      {/* Display name */}
      <StyledInput
        label={t('settings:displayName')}
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
    </form>
  );
};

export default UpdateUser;
