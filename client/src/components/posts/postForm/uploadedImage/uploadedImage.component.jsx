import React, { useEffect } from 'react';
import Spinner from '../../../layout/spinner/spinner.component';
import { SvgGarbage } from '../../../layout/icons';
import { connect } from 'react-redux';
import { uploadImage, deleteImage } from '../../../../actions/post';
import PropTypes from 'prop-types';

import './uploadedImage.style.scss';

const UploadedImage = ({
  image,
  deleteImage,
  uploadImage,
  deleteImageFromState,
  async: { loading, loadingElements },
  uploadedImages,
  postId,
}) => {
  useEffect(() => {
    if (
      !loadingElements.includes(image.id) &&
      !uploadedImages.find((obj) => obj.id === image.id)
    ) {
      const data = new FormData();
      data.append('image', image);
      data.append('id', image.id);
      uploadImage(data);
    }
    // eslint-disable-next-line
  }, []);

  const imageIsUploading = loading && loadingElements.includes(image.id);

  const handleDeleteImage = () => {
    deleteImage(postId, image.id);
    deleteImageFromState(image.id);
  };

  return (
    <div className="image-container">
      <img className="image" src={image.preview} alt="state-img"></img>
      <div className={`overlay ${imageIsUploading && 'loading'}`}>
        {imageIsUploading && (
          <div className="spinner">
            <Spinner style={{ width: '30px' }} />
          </div>
        )}
        <div className="icon-background" onClick={() => handleDeleteImage()}>
          <SvgGarbage />
        </div>
      </div>
    </div>
  );
};

UploadedImage.propTypes = {
  async: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  uploadedImages: PropTypes.array.isRequired,
  postId: PropTypes.number,
  uploadImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  deleteImageFromState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  async: state.async,
  uploadedImages: state.post.postForm.images,
  postId: state.post.postForm._id,
});

export default connect(mapStateToProps, { uploadImage, deleteImage })(
  UploadedImage,
);
