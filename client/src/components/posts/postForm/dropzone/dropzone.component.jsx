import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { SvgImage } from '../../../layout/icons';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import './dropzone.style.scss';

const Dropzone = ({ images, setImages }) => {
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const newImages = (
        await Promise.all(
          acceptedFiles.map(async (image) => {
            try {
              const result = await axios.get('/api/posts/generate_upload_id');
              const id = result.data.id;

              Object.assign(image, {
                preview: URL.createObjectURL(image),
                id,
              });

              return image;
            } catch (error) {
              console.log(error);
              return null;
            }
          }),
        )
      ).filter((image) => image !== null);

      setImages([...images, ...newImages]);
    },
    [images, setImages],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: 'image/*',
    maxSize: 10485760,
  });

  const [t] = useTranslation();

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive && 'dropzone--active'} ${
        images.length > 0 && 'dropzone--filled'
      }`}
    >
      <SvgImage width={'6em'} height={'6em'} className="mb-05" />
      <span className="btn btn-primary btn-sm">{t('dropzone.click')}</span>
      <p>{t('dropzone.drag')}</p>
      <input {...getInputProps()} />
    </div>
  );
};

Dropzone.propTypes = {
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func.isRequired,
};

export default Dropzone;
