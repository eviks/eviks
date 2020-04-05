import React, { useEffect } from 'react'
import Spinner from '../../../layout/spinner/spinner.component'
import { connect } from 'react-redux'
import { uploadPhoto } from '../../../../actions/post'
import PropTypes from 'prop-types'

import './uploadedImage.style.scss'

const UploadedImage = ({
  file,
  deletePhoto,
  uploadPhoto,
  async: { loading, loadingElements },
  post: { uploadedPhotos }
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
          onClick={() => deletePhoto(file.photoId)}
        >
          <i className="fas fa-trash"></i>
        </div>
      </div>
    </div>
  )
}

UploadedImage.propTypes = {
  file: PropTypes.object.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  uploadPhoto: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  async: state.async,
  post: state.post
})

export default connect(mapStateToProps, { uploadPhoto })(UploadedImage)
