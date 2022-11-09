import React, { FC, Fragment, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useSnackbar } from 'notistack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import PostRejection from './PostRejection';
import { AppContext } from '../../store/appContext';
import { confirmPost } from '../../actions/post';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';

const PostModerationPanel: FC<{ postId: number }> = ({ postId }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const {
    state: {
      auth: { token },
    },
  } = useContext(AppContext);

  const [openRejection, setOpenRejection] = useState<boolean>(false);

  const handlePostConfirmation = async () => {
    try {
      await confirmPost(token ?? '', postId);
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
  };

  const handlePostRejection = () => {
    setOpenRejection(true);
  };

  return (
    <Fragment>
      <Hidden lgDown>
        <Paper sx={{ p: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontSize: 24,
              fontWeight: 400,
              textAlign: 'center',
              mb: 2,
            }}
          >
            {t('postModeration:moderation')}
          </Typography>
          <Button
            color="success"
            variant="contained"
            fullWidth
            disableElevation
            onClick={handlePostConfirmation}
            sx={{ py: 1.2 }}
          >
            {t('postModeration:confirm')}
          </Button>
          <Button
            color="error"
            variant="contained"
            fullWidth
            disableElevation
            onClick={handlePostRejection}
            sx={{ mt: 1, py: 1.2 }}
          >
            {t('postModeration:reject')}
          </Button>
          <PostRejection
            postId={postId}
            open={openRejection}
            setOpen={setOpenRejection}
          />
        </Paper>
      </Hidden>
      <Hidden lgUp>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            color="success"
            variant="contained"
            fullWidth
            disableElevation
            onClick={handlePostConfirmation}
            sx={{ py: 1.2, mr: 1 }}
          >
            {t('postModeration:confirm')}
          </Button>
          <Button
            color="error"
            variant="contained"
            fullWidth
            disableElevation
            onClick={handlePostRejection}
            sx={{ py: 1.2 }}
          >
            {t('postModeration:reject')}
          </Button>
          <PostRejection
            postId={postId}
            open={openRejection}
            setOpen={setOpenRejection}
          />
        </Box>
      </Hidden>
    </Fragment>
  );
};

export default PostModerationPanel;
