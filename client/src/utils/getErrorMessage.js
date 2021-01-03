const getErrorMessage = (fieldName, fields) => {
  if (fieldName === 'address') {
    return 'createPost.mapInfo.wrongAddress'
  }

  if (fieldName === 'city') {
    return 'createPost.mapInfo.wrongCity'
  }

  return 'form.requiredField'
}

export default getErrorMessage
