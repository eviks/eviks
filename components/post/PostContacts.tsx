import React, { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { fetchPostPhoneNumber } from '../../actions/posts';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';
import { Post } from '../../types';

const PostContacts: FC<{
  post: Post;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}> = ({ post, phoneNumber, setPhoneNumber }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const getPhoneNumber = async () => {
    try {
      const result = await fetchPostPhoneNumber(post._id.toString());
      setPhoneNumber(result.phoneNumber);
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
    <Box
      sx={{
        my: 3,
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
        p: 2,
        borderRadius: 5,
      }}
    >
      <Typography variant="subtitle1" fontWeight={500}>
        {t(`post:${post.userType}`)}
      </Typography>
      <Typography variant="subtitle1" fontSize={18}>
        {post.username}
      </Typography>
      <Hidden mdDown>
        <Box sx={{ mt: 1 }}>
          {!phoneNumber ? (
            <Button
              variant="contained"
              fullWidth
              disableElevation
              onClick={getPhoneNumber}
              sx={{ py: 1.2 }}
            >
              {t('post:showPhoneNumber')}
            </Button>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography fontSize={32}>{phoneNumber}</Typography>
              <Typography
                variant="caption"
                color={(theme) => {
                  return theme.palette.text.secondary;
                }}
              >
                {t('post:callHint')}
              </Typography>
            </Box>
          )}
        </Box>
      </Hidden>
    </Box>
  );
};

export default PostContacts;
