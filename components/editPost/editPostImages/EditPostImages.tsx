import React, { useContext, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import PostImageDropzone from './PostImageDropzone';
import UploadedPostImage from './UploadedPostImage';
import StepTitle from '../StepTitle';
import { AppContext } from '../../../store/appContext';
import { setPostData } from '../../../actions/post';
import { ImageData } from '../../../types';

const EditPostImages = () => {
  const { t } = useTranslation();

  const {
    state: { post },
    dispatch,
  } = useContext(AppContext);

  const isTempImage = (id: string): boolean => {
    if (!post.originalImages) return false;
    return (
      post.originalImages.find((element) => {
        return element === id;
      }) === undefined
    );
  };

  const [images, setImages] = useState<ImageData[]>(
    (post.lastStep || -1) >= 5
      ? post.images.map((id) => {
          return { id, isUploaded: true, isTemp: isTempImage(id) };
        })
      : [],
  );

  const [displayError, setDisplayError] = useState<boolean>(false);

  const setPostDataAndDispatch = (step: number) => {
    setPostData({
      ...post,
      images: images.map((image) => {
        return image.id;
      }),
      step,
      lastStep: Math.max(5, post.lastStep ?? 5),
    })(dispatch);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      images.filter((image) => {
        return image.isUploaded;
      }).length < 3
    ) {
      setDisplayError(true);
      return;
    }

    setPostDataAndDispatch(6);
  };

  const handlePrevStepClick = () => {
    setPostDataAndDispatch(4);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container
        disableGutters
        sx={{
          py: { md: 5 },
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'start',
        }}
      >
        <StepTitle title={t('post:images')} />
        <PostImageDropzone images={images} setImages={setImages} />
        {displayError && (
          <Box sx={{ mb: 2, width: '100%' }}>
            {<Typography color={'error'}>{t('post:imagesError')}</Typography>}
          </Box>
        )}
        {images.length > 0 && (
          <Grid
            container
            spacing={2}
            columns={{ xs: 4, sm: 9, md: 8, lg: 12 }}
            sx={{
              justifyContent: 'start',
            }}
          >
            {images.map((image) => {
              return (
                <Grid
                  item
                  xs={2}
                  sm={3}
                  md={2}
                  lg={2}
                  key={image.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <UploadedPostImage image={image} setImages={setImages} />
                </Grid>
              );
            })}
          </Grid>
        )}
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

export default EditPostImages;
