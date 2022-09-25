import React, { FC, useState, useContext } from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { AppContext } from '../../store/appContext';
import { deletePost, deleteUnreviewedPost } from '../../actions/post';
import GarbageIcon from '../icons/GarbageIcon';
import CloseIcon from '../icons/CloseIcon';
import useWindowSize from '../../utils/hooks/useWindowSize';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';
import { ReviewStatus } from '../../types';

const DeletePostButton: FC<{
  postId: number;
  reviewStatus?: ReviewStatus;
  unreviewed: boolean;
}> = ({ postId, reviewStatus, unreviewed }) => {
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

  const handleClick = async (event: React.FormEvent) => {
    event.preventDefault();
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleDeletePost = async () => {
    try {
      if (unreviewed) {
        await deleteUnreviewedPost(auth.token ?? '', postId)(dispatch);
      } else {
        await deletePost(auth.token ?? '', postId)(dispatch);
      }
      setOpen(false);
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
    <Box>
      <Tooltip title={t('common:deletePostButton')}>
        <Button
          variant="contained"
          onClick={handleClick}
          aria-label="delete-post"
          size="large"
          disabled={reviewStatus === 'onreview'}
          sx={{
            minWidth: 'auto',
            p: 1.4,
            borderRadius: 2,
            zIndex: '200',
            backgroundColor: theme.palette.background.default,
            color: theme.palette.action.active,
            '&:hover, &.Mui-focusVisible': {
              backgroundColor: theme.palette.background.default,
            },
          }}
        >
          <GarbageIcon />
        </Button>
      </Tooltip>
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
          {t('common:deletePost')}
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
              src={'/illustrations/delete_post.svg'}
              alt="delete_post"
              width={400}
              height={400}
            />
            <Typography variant="h4" textAlign={'center'}>
              {t('common:deletePostTitle')}
            </Typography>
            <Typography variant="subtitle1" textAlign={'center'}>
              {t('common:deletePostContent')}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button onClick={onClose}>{t('common:deletePostCancel')}</Button>
              <Button
                variant="text"
                disableRipple
                sx={{
                  ml: 1,
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: 'transparent',
                  },
                }}
                onClick={handleDeletePost}
              >
                <Typography
                  variant="button"
                  color={theme.palette.text.disabled}
                >
                  {t('common:deletePostAnyway')}
                </Typography>
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DeletePostButton;
