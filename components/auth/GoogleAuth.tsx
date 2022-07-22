import React, { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import GoogleIcon from '../icons/GoogleIcon';
import { AppContext } from '../../store/appContext';
import { loadUser } from '../../actions/auth';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';

let windowObjectReference: Window | null = null;
let previousUrl: string | null = null;

const GoogleAuth: FC<{ redirect: boolean }> = ({ redirect }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const { dispatch } = useContext(AppContext);

  const receiveMessage = async (event: MessageEvent<any>) => {
    if (event.origin !== process.env.NEXT_PUBLIC_BASE_URL) {
      return;
    }

    const { data } = event;

    if (data.source === 'login-redirect') {
      const { token } = data;

      Cookies.set('token', token, { expires: 365 });

      try {
        await loadUser()(dispatch);
        if (redirect) router.push({ pathname: '/' });
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
    }
  };

  const openSignInWindow = (url: string, name: string) => {
    window.removeEventListener('message', receiveMessage);

    const strWindowFeatures =
      'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

    if (windowObjectReference === null || windowObjectReference.closed) {
      windowObjectReference = window.open(url, name, strWindowFeatures);
    } else if (previousUrl !== url) {
      windowObjectReference = window.open(url, name, strWindowFeatures);
      windowObjectReference?.focus();
    } else {
      windowObjectReference.focus();
    }

    window.addEventListener(
      'message',
      (event) => {
        return receiveMessage(event);
      },
      false,
    );
    // assign the previous URL
    previousUrl = url;
  };

  return (
    <Box sx={{ my: 3 }}>
      <Divider>{t('auth:loginOr')}</Divider>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        disableElevation
        disableFocusRipple
        startIcon={<GoogleIcon />}
        onClick={() => {
          return openSignInWindow(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google`,
            'Google',
          );
        }}
        sx={{
          my: 2,
          py: 1,
          color: theme.palette.getContrastText(
            theme.palette.background.default,
          ),
          borderColor: theme.palette.divider,
          '&:hover': {
            borderColor: theme.palette.divider,
          },
        }}
      >
        {t('auth:loginWithGoogle')}
      </Button>
    </Box>
  );
};

export default GoogleAuth;
