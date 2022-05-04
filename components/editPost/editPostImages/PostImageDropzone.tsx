import React, { FC, useCallback, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { getImageUploadId } from '../../../actions/post';
import { AppContext } from '../../../store/appContext';
import ImageIcon from '../../icons/ImageIcon';
import { FileWithPreview, ImageData } from '../../../types';

const PostImageDropzone: FC<{
  images: ImageData[];
  setImages: React.Dispatch<React.SetStateAction<ImageData[]>>;
}> = ({ images, setImages }) => {
  const { t } = useTranslation();

  const { state } = useContext(AppContext);

  const theme = useTheme();

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const newImages = (
        await Promise.all<ImageData>(
          acceptedFiles.map(async (file: FileWithPreview) => {
            try {
              const id = await getImageUploadId(state.auth.token ?? '');

              Object.assign(file, {
                preview: URL.createObjectURL(file),
              });

              const imageData: ImageData = {
                file,
                id,
                isTemp: true,
                isUploaded: false,
              };

              return imageData;
            } catch (error) {
              return null;
            }
          }),
        )
      ).filter((image) => {
        return image !== null;
      });

      setImages([...images, ...newImages]);
    },
    [images, setImages, state.auth.token],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'image/*': [],
    },
    maxSize: 10485760,
  });

  const greyColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[300]
      : theme.palette.grey[800];

  const dropzoneStyle = {
    width: '100%',
    height: '200px',
    border: '2px dashed',
    borderColor: isDragActive ? theme.palette.primary.main : greyColor,
    borderRadius: '8px',
    marginBottom: '1rem',
    cursor: 'pointer',
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  };

  return (
    <section className="container1">
      <Box {...getRootProps()} sx={dropzoneStyle}>
        <input {...getInputProps()} />
        <ImageIcon color="disabled" sx={{ fontSize: '4rem', mb: 1 }} />
        <Typography>{t('post:dropzoneHint')}</Typography>
      </Box>
    </section>
  );
};

export default PostImageDropzone;
