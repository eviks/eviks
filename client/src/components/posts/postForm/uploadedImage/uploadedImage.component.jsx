import React from 'react'
import PropTypes from 'prop-types'

import './uploadedImage.style.scss'

const UploadedImage = ({ file, deletePhoto }) => {
  return (
    <div className="image-container">
      <img className="image" src={file.preview} alt="state-img"></img>
      <div className="overlay">
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
  deletePhoto: PropTypes.func.isRequired
}

export default UploadedImage
