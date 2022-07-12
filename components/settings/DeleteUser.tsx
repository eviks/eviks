import React, { FC, useState, useContext } from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { AppContext } from '../../store/appContext';
import { deleteUser } from '../../actions/auth';
import CloseIcon from '../icons/CloseIcon';
import useWindowSize from '../../utils/hooks/useWindowSize';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';

const DeleteUser: FC = () => {
  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const {
    state: { auth },
    dispatch,
  } = useContext(AppContext);

  const { width } = useWindowSize();
  const fullScreen = (width ?? 0) < 900;

  const [open, setOpen] = useState<boolean>(false);

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(auth.token ?? '')(dispatch);
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
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Button
        variant="text"
        disableRipple
        sx={{
          ml: 1,
          '&.MuiButtonBase-root:hover': {
            bgcolor: 'transparent',
          },
        }}
        onClick={handleClick}
      >
        <Typography variant="button" color={theme.palette.text.disabled}>
          {t('settings:deleteProfile')}
        </Typography>
      </Button>
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={fullScreen}
        PaperProps={{
          sx: {
            width: { md: '800px' },
            maxWidth: { md: '800px' },
            height: { md: '600px' },
          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          {t('settings:deleteProfile')}
          {
            <IconButton
              aria-label="close"
              onClick={onClose}
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
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Image
              src={'/illustrations/delete_user.svg'}
              alt="delete_user"
              width={300}
              height={300}
            />
            <Typography variant="h4" textAlign={'center'}>
              {t('settings:deleteProfileTitle')}
            </Typography>
            <Typography variant="subtitle1" textAlign={'center'}>
              {t('settings:deleteProfileContent')}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button onClick={onClose}>
                {t('settings:deleteProfileCancel')}
              </Button>
              <Button
                variant="text"
                disableRipple
                sx={{
                  ml: 1,
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: 'transparent',
                  },
                }}
                onClick={handleDeleteUser}
              >
                <Typography
                  variant="button"
                  color={theme.palette.text.disabled}
                >
                  {t('settings:deleteProfileAnyway')}
                </Typography>
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DeleteUser;
