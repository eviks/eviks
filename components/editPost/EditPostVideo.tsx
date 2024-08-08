import React, { FC, useContext } from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Hidden from '@mui/material/Hidden';
import { useFormik } from 'formik';
import * as yup from 'yup';
import StyledInput from '../layout/StyledInput';
import VideoIcon from '../icons/VideoIcon';
import { AppContext } from '../../store/appContext';
import { setPostData } from '../../actions/post';

interface VideoState {
  videoLink: string;
}

const EditPostVideo: FC = () => {
  const { t } = useTranslation();

  const {
    state: { post },
    dispatch,
  } = useContext(AppContext);

  const validationSchema = yup.object({
    videoLink: yup
      .string()
      .matches(
        /^(https?:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/,
        t('post:invalidYoutubeLink'),
      ),
  });

  const formik = useFormik<VideoState>({
    initialValues: {
      videoLink: (post.lastStep || -1) >= 5 ? post.videoLink ?? '' : '',
    },
    validationSchema,
    onSubmit: async () => {
      // eslint-disable-next-line no-use-before-define
      setPostDataAndDispatch(6);
    },
  });

  const { videoLink } = formik.values;

  const setPostDataAndDispatch = (step: number) => {
    const updatedPost = {
      ...post,
      videoLink,
      step,
      lastStep: Math.max(5, post.lastStep ?? 5),
    };
    setPostData(updatedPost)(dispatch);
    return updatedPost;
  };

  const handlePrevStepClick = () => {
    setPostDataAndDispatch(4);
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
          <Grid item xs={10} md={5}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4">{t('post:videoLinkTitle')}</Typography>
              <Typography variant="subtitle1">
                {t('post:videoLinkHint')}
              </Typography>
            </Box>
            <Box>
              {/* Video link */}
              <StyledInput
                label={t('post:youtubeLink')}
                input={{
                  id: 'videoLink',
                  name: 'videoLink',
                  value: videoLink,
                  placeholder: 'https://youtu.be/',
                  autoComplete: 'off',
                  type: 'text',
                  fullWidth: true,
                  onChange: formik.handleChange,
                  startAdornment: (
                    <InputAdornment position="start">
                      <VideoIcon sx={{ ml: 1 }} />
                    </InputAdornment>
                  ),
                }}
                helperText={formik.touched.videoLink && formik.errors.videoLink}
              />
            </Box>
          </Grid>
          <Hidden mdDown>
            <Grid item xs={0} md={5}>
              <Box
                sx={{
                  display: 'flex',
                  justifyItems: 'center',
                  alignContent: 'center',
                  padding: '0 5rem',
                }}
              >
                <Image
                  src={'/illustrations/video.png'}
                  alt="auth"
                  width={250}
                  height={250}
                />
              </Box>
            </Grid>
          </Hidden>
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
            disableElevation
            sx={{ mt: 1, py: 1 }}
            onClick={handlePrevStepClick}
          >
            {t('post:back')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            sx={{ mt: 1, py: 1 }}
          >
            {t('post:next')}
          </Button>
        </Container>
      </Container>
    </form>
  );
};

export default EditPostVideo;
