import React, { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import StyledInput from '../layout/StyledInput';
import CloseIcon from '../icons/CloseIcon';
import { AppContext } from '../../store/appContext';
import { rejectPost } from '../../actions/post';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';

const PostRejection: FC<{
  postId: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ postId, open, setOpen }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const {
    state: {
      auth: { token },
    },
  } = useContext(AppContext);

  const validationSchema = yup.object({
    rejectionReason: yup.string().required(t('common:errorRequiredField')),
  });

  const formik = useFormik<{ rejectionReason: string }>({
    initialValues: { rejectionReason: '' },
    validationSchema,
    onSubmit: async () => {
      try {
        // eslint-disable-next-line no-use-before-define
        await rejectPost(token ?? '', postId, rejectionReason);
        router.push({ pathname: '/post_review' });
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
    },
  });

  const { rejectionReason } = formik.values;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: { md: '800px' },
          maxWidth: { md: '800px' },
        },
      }}
    >
      <DialogTitle>
        {t('postModeration:rejectionTitle')}
        {
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              p: 2,
              color: (theme) => {
                return theme.palette.mode === 'light'
                  ? theme.palette.grey[500]
                  : theme.palette.grey[300];
              },
            }}
          >
            <CloseIcon sx={{ fontSize: '18px' }} />
          </IconButton>
        }
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent dividers>
          <StyledInput
            label={t('postModeration:rejectionReason')}
            input={{
              id: 'rejectionReason',
              name: 'rejectionReason',
              value: rejectionReason,
              type: 'text',
              fullWidth: true,
              multiline: true,
              rows: 4,
              onChange: formik.handleChange,
            }}
            helperText={
              formik.touched.rejectionReason && formik.errors.rejectionReason
            }
          />
        </DialogContent>

        <DialogActions>
          <Button type="submit" autoFocus variant="contained" disableElevation>
            {t('postModeration:reject')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PostRejection;
