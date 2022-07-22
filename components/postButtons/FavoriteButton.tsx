import React, { FC, Fragment, useContext, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import ModalAuth from '../auth/ModalAuth';
import { AppContext } from '../../store/appContext';
import {
  addPostToFavorites,
  removePostFromFavorites,
} from '../../actions/auth';
import HeartIcon from '../icons/HeartIcon';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';

const FavoriteButton: FC<{ postId: number }> = ({ postId }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const {
    state: { auth },
    dispatch,
  } = useContext(AppContext);

  const { user, token, isInit } = auth;

  const favorites = user && user.favorites ? user.favorites : {};
  const isFavorite = favorites[postId] === true;

  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const onClose = () => {
    setOpen(false);
  };

  const handleClick = async () => {
    if (!isInit) {
      return;
    }

    if (!user) {
      setOpen(true);
      return;
    }

    setLoading(true);

    try {
      if (isFavorite) {
        await removePostFromFavorites(postId, token ?? '')(dispatch);
      } else {
        await addPostToFavorites(postId, token ?? '')(dispatch);
      }
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

  return (
    <Fragment>
      <Tooltip title={t('common:favoriteButton')}>
        <Button
          variant="contained"
          onClick={handleClick}
          disabled={loading}
          aria-label="favorite"
          size="large"
          sx={{
            minWidth: 'auto',
            p: 1.4,
            borderRadius: 2,
            zIndex: '200',
            backgroundColor: isFavorite
              ? theme.palette.primary.main
              : theme.palette.background.default,
            color: isFavorite
              ? theme.palette.background.default
              : theme.palette.action.active,
            '&:hover, &.Mui-focusVisible': {
              backgroundColor: isFavorite
                ? theme.palette.primary.light
                : theme.palette.background.default,
            },
          }}
        >
          <HeartIcon />
        </Button>
      </Tooltip>
      <ModalAuth open={open} onClose={onClose} />
    </Fragment>
  );
};

export default FavoriteButton;
