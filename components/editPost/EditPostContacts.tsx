import React, { FC, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Hidden from '@mui/material/Hidden';
import CircularProgress from '@mui/material/CircularProgress';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import StyledInput from '../layout/StyledInput';
import PhoneCallIcon from '../icons/PhoneCallIcon';
import UserIcon from '../icons/UserIcon';
import { AppContext } from '../../store/appContext';
import { setPostData, createPost, updatePost } from '../../actions/post';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';
import { Post } from '../../types';

interface ContactsState {
  phoneNumber: string;
  username: string;
}

const EditPostContacts: FC<{ unreviewed: boolean }> = ({ unreviewed }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const {
    state: { post, auth },
    dispatch,
  } = useContext(AppContext);

  const [loading, setLoading] = useState<boolean>(false);

  const createOrUpdatePost = async (updatedPost: Post) => {
    setLoading(true);

    try {
      if (post._id === 0 || unreviewed) {
        const createdPost = await createPost(auth.token ?? '', updatedPost);
        router.push({ pathname: `/posts/unreviewed/${createdPost.data._id}` });
      } else {
        await updatePost(auth.token ?? '', updatedPost);
        router.push({ pathname: `/posts/unreviewed/${post._id}` });
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

  const validationSchema = yup.object({
    phoneNumber: yup.string().required(t('common:errorRequiredField')),
    username: yup.string().required(t('common:errorRequiredField')),
  });

  const formik = useFormik<ContactsState>({
    initialValues: {
      phoneNumber: (post.lastStep || -1) >= 7 ? post.phoneNumber ?? '' : '',
      username: (post.lastStep || -1) >= 7 ? post.username : '',
    },
    validationSchema,
    onSubmit: async () => {
      // eslint-disable-next-line no-use-before-define
      const updatedPost = setPostDataAndDispatch(7);
      createOrUpdatePost(updatedPost);
    },
  });

  const { phoneNumber, username } = formik.values;

  const setPostDataAndDispatch = (step: number) => {
    const updatedPost = {
      ...post,
      phoneNumber,
      username,
      step,
      lastStep: Math.max(7, post.lastStep ?? 7),
    };
    setPostData(updatedPost)(dispatch);
    return updatedPost;
  };

  const handlePrevStepClick = () => {
    setPostDataAndDispatch(6);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container
        disableGutters
        sx={{
          py: { md: 5 },
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'start',
        }}
      >
        <Grid container direction={'row'} columns={10} alignItems={'center'}>
          <Hidden mdDown>
            <Grid item xs={0} md={5}>
              <Box>
                <Image
                  src={'/illustrations/confirm.svg'}
                  alt="auth"
                  width={500}
                  height={500}
                />
              </Box>
            </Grid>
          </Hidden>
          <Grid item xs={10} md={5}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4">
                {t('post:postAlmostCreated')}
              </Typography>
              <Typography variant="subtitle1">
                {t('post:postAlmostCreatedHint')}
              </Typography>
            </Box>
            <Box>
              {/* Username */}
              <StyledInput
                label={t('post:username')}
                input={{
                  id: 'username',
                  name: 'username',
                  value: username,
                  type: 'text',
                  fullWidth: true,
                  onChange: formik.handleChange,
                  startAdornment: (
                    <InputAdornment position="start">
                      <UserIcon sx={{ ml: 1 }} />
                    </InputAdornment>
                  ),
                }}
                helperText={formik.touched.username && formik.errors.username}
              />
              {/* Phone number */}
              <StyledInput
                label={t('post:phoneNumber')}
                input={{
                  id: 'phoneNumber',
                  name: 'phoneNumber',
                  value: phoneNumber,
                  type: 'text',
                  fullWidth: true,
                  onChange: formik.handleChange,
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneCallIcon sx={{ ml: 1 }} />
                    </InputAdornment>
                  ),
                }}
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                disableElevation
                sx={{ mt: 1, py: 1 }}
              >
                {loading ? (
                  <CircularProgress color="inherit" size="2rem" />
                ) : (
                  t('post:submitPost')
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Container
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type={'button'}
            variant="contained"
            color="secondary"
            sx={{ mt: 1, py: 1 }}
            disabled={loading}
            disableElevation
            onClick={handlePrevStepClick}
          >
            {t('post:back')}
          </Button>
        </Container>
      </Container>
    </form>
  );
};

export default EditPostContacts;
