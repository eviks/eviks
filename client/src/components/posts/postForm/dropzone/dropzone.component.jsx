import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import uuid from 'uuid'
import PropTypes from 'prop-types'

import './dropzone.style.scss'

const Dropzone = ({ files, setFiles }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      const newPhotos = acceptedFiles.map(file => {
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          photoId: uuid.v4()
        })
        return file
      })

      setFiles([...files, ...newPhotos])
    },
    [files, setFiles]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: 'image/*',
    maxSize: 10485760
  })

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive &&
        'dropzone--active'} ${files.length > 0 && 'dropzone--filled'}`}
    >
      <i className="far fa-images fa-5x"></i>
      <p>Click or drag</p>
      <input {...getInputProps()} />
    </div>
  )
}

Dropzone.propTypes = {
  files: PropTypes.array.isRequired,
  setFiles: PropTypes.func.isRequired
}

export default Dropzone
