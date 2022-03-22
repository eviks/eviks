import React, { FC, useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import useTranslation from 'next-translate/useTranslation';
import { useSnackbar } from 'notistack';
import { AppContext } from '../../store/appContext';
import {
  addPostToFavorites,
  removePostFromFavorites,
} from '../../actions/auth';
import HeartIcon from '../icons/HeartIcon';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';

const FavoriteButton: FC<{ postId: number }> = ({ postId }) => {
  const { state, dispatch } = useContext(AppContext);

  const favorites =
    state.auth.user && state.auth.user.favorites
      ? state.auth.user.favorites
      : {};

  const isFavorite = favorites[postId] === true;

  const { t } = useTranslation();

  const theme = useTheme();

  const [loading, setLoading] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleClick = async () => {
    if (!state.auth.token) {
      return;
    }

    setLoading(true);

    try {
      if (isFavorite) {
        await removePostFromFavorites(postId, state.auth.token)(dispatch);
      } else {
        await addPostToFavorites(postId, state.auth.token)(dispatch);
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
    <Tooltip title={t('common:favoriteButton')}>
      <IconButton
        onClick={handleClick}
        disabled={loading}
        aria-label="favorite"
        size="large"
        sx={{
          zIndex: '200',
          backgroundColor: isFavorite
            ? theme.palette.primary.main
            : theme.palette.background.default,
          color: isFavorite ? theme.palette.background.default : null,
          '&:hover, &.Mui-focusVisible': {
            backgroundColor: isFavorite
              ? theme.palette.primary.light
              : theme.palette.background.default,
          },
        }}
      >
        <HeartIcon viewBox="0 0 512 512" />
      </IconButton>
    </Tooltip>
  );
};

export default FavoriteButton;
