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

const PostImages = ({ images, setImages, error }) => {
  const [t] = useTranslation()

  const deleteImageFromState = id => {
    setImages(images.filter(image => image.id !== id))
  }

  return (
    <FadeInDiv className="post-step">
      <h3 className="step-title my-1">{t('createPost.images.title')}</h3>
      <p className="my-1">{t('createPost.images.additionalInfo')}</p>
      {error && (
        <div className="field-required">{t('createPost.images.minImages')}</div>
      )}
      {images.length > 0 ? (
        <div className="upload-images">
          {images.map(image => (
            <UploadedImage
              key={image.id}
              image={image}
              deleteImageFromState={deleteImageFromState}
            />
          ))}
          <Dropzone images={images} setImages={setImages} />
        </div>
      ) : (
        <Dropzone images={images} setImages={setImages} />
      )}
    </FadeInDiv>
  )
}

PostImages.propTypes = {
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func.isRequired,
  error: PropTypes.string
}

const mapStateToProps = state => ({
  error: state.post.validationErrors.images
})

export default connect(mapStateToProps)(PostImages)
