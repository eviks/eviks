import React from 'react'
import { connect } from 'react-redux'
import Dropzone from '../dropzone/dropzone.component'
import UploadedImage from '../uploadedImage/uploadedImage.component'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import '../postForm.style.scss'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const PostPhotos = ({ files, setFiles, error }) => {
  const [t] = useTranslation()

  const deletePhotoFromState = photoId => {
    setFiles(files.filter(file => file.photoId !== photoId))
  }

  return (
    <FadeInDiv className="post-step">
      <h3 className="step-title my-1">{t('createPost.photos.title')}</h3>
      <p className="my-1">{t('createPost.photos.additionalInfo')}</p>
      {error && (
        <div className="field-required">{t('createPost.photos.minPhotos')}</div>
      )}
      {files.length > 0 ? (
        <div className="upload-images">
          {files.map(file => (
            <UploadedImage
              key={file.photoId}
              file={file}
              deletePhotoFromState={deletePhotoFromState}
            />
          ))}
          <Dropzone files={files} setFiles={setFiles} />
        </div>
      ) : (
        <Dropzone files={files} setFiles={setFiles} />
      )}
    </FadeInDiv>
  )
}

PostPhotos.propTypes = {
  files: PropTypes.array.isRequired,
  setFiles: PropTypes.func.isRequired,
  error: PropTypes.bool
}

const mapStateToProps = state => ({
  error: state.post.validationErrors.photos
})

export default connect(mapStateToProps)(PostPhotos)
