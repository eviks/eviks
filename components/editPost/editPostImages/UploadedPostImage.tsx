import React, { FC, useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { useTheme, alpha } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { AppContext } from '../../../store/appContext';
import { uploadImage, deleteImage } from '../../../actions/post';
import GarbageIcon from '../../icons/GarbageIcon';
import Failure from '../../../utils/errors/failure';
import ServerError from '../../../utils/errors/serverError';
import { ImageData } from '../../../types';

const UploadedPostImage: FC<{
  image: ImageData;
  setImages: React.Dispatch<React.SetStateAction<ImageData[]>>;
}> = ({ image, setImages }) => {
  const { t } = useTranslation();

  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const { state } = useContext(AppContext);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const upload = async () => {
      await uploadImage(state.auth.token ?? '', image);

      setImages((prevState) => {
        return prevState.map((element) => {
          if (element.id === image.id) {
            Object.assign(element, { isUploaded: true });
          }
          return element;
        });
      });

      setLoading(false);
    };

    if (!image.isUploaded) {
      try {
        upload();
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
    } else {
      setLoading(false);
    }
  }, [
    enqueueSnackbar,
    image,
    image.isUploaded,
    setImages,
    state.auth.token,
    t,
  ]);

  const handleDelete = async () => {
    let errorMessage = '';
    if (image.isTemp) {
      try {
        await deleteImage(state.auth.token ?? '', image.id);
      } catch (error) {
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

    if (errorMessage) return;

    setImages((prevState) => {
      return prevState.filter((element) => {
        return element.id !== image.id;
      });
    });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '150px',
        height: '150px',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <Container
        sx={[
          {
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            width: '100%',
            height: '100%',
            backgroundColor: alpha(theme.palette.background.default, 0.5),
            opacity: loading ? 1 : 0,
            transition: '0.3s ease',
          },
          {
            '&:hover': {
              opacity: 1,
            },
          },
        ]}
      >
        {loading && <CircularProgress color="primary" size="2rem" />}
        <IconButton
          onClick={handleDelete}
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            m: 1,
          }}
        >
          <GarbageIcon />
        </IconButton>
      </Container>
      <Image
        objectFit="cover"
        src={
          !image.isUploaded
            ? image.file?.preview ?? ''
            : `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${
                image.isTemp ? 'temp/' : ''
              }post_images/${image.id}/image_${160}.webp`
        }
        width={'150px'}
        height={'150px'}
        alt={`post-image-${image.id}-${160}`}
      />
    </Box>
  );
};

export default UploadedPostImage;
