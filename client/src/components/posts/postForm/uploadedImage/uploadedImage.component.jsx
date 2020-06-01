import React, { useEffect } from 'react'
import Spinner from '../../../layout/spinner/spinner.component'
import { connect } from 'react-redux'
import { uploadPhoto, deletePhoto } from '../../../../actions/post'
import PropTypes from 'prop-types'

import './uploadedImage.style.scss'

const UploadedImage = ({
  file,
  deletePhoto,
  uploadPhoto,
  deletePhotoFromState,
  async: { loading, loadingElements },
  uploadedPhotos
}) => {
  useEffect(() => {
    if (
      !loadingElements.includes(file.photoId) &&
      !uploadedPhotos.find(obj => obj.photoId === file.photoId)
    ) {
      const data = new FormData()
      data.append('photo', file)
      uploadPhoto(data, file.photoId)
    }
  }, [uploadPhoto, file, loadingElements, uploadedPhotos])

  const photoIsUploading = loading && loadingElements.includes(file.photoId)

  const handleDeletePhoto = photoId => {
    const photoToDelete = uploadedPhotos.filter(
      photo => photo.photoId === photoId
    )
    if (photoToDelete.length === 1) {
      photoToDelete[0].fileNames.map(fileName => deletePhoto(photoId, fileName))
      deletePhotoFromState(photoId)
    }
  }

  return (
    <div className="image-container">
      <img className="image" src={file.preview} alt="state-img"></img>
      <div className={`overlay ${photoIsUploading && 'loading'}`}>
        {photoIsUploading && (
          <div className="spinner">
            <Spinner style={{ width: '30px' }} />
          </div>
        )}
        <div
          className="icon-background"
          onClick={() => handleDeletePhoto(file.photoId)}
        >
          <i className="fas fa-trash"></i>
        </div>
      </div>
    </div>
  )
}

UploadedImage.propTypes = {
  async: PropTypes.object.isRequired,
  file: PropTypes.object.isRequired,
  uploadedPhotos: PropTypes.array.isRequired,
  uploadPhoto: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  deletePhotoFromState: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  async: state.async,
  uploadedPhotos: state.post.postForm.photos
})

export default connect(mapStateToProps, { uploadPhoto, deletePhoto })(
  UploadedImage
)
