/*google*/
import React from 'react'
import Dropzone from '../dropzone/dropzone.component'
import UploadedImage from '../uploadedImage/uploadedImage.component'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import PropTypes from 'prop-types'

import '../postForm.style.scss'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const PostPhotos = ({ files, setFiles }) => {
  const deletePhoto = photoId => {
    setFiles(files.filter(file => file.photoId !== photoId))
  }

  return (
    <FadeInDiv>
      <h3 className="my-1">Paste some of your estate photos</h3>
      {files.length > 0 ? (
        <div className="upload-images">
          {files.map(file => (
            <UploadedImage
              key={file.photoId}
              file={file}
              deletePhoto={deletePhoto}
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
  setFiles: PropTypes.func.isRequired
}

export default PostPhotos
