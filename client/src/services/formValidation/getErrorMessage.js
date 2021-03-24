const getErrorMessage = (fieldName, fields) => {
  if (fieldName === 'address') {
    return 'createPost.mapInfo.wrongAddress'
  }

  if (fieldName === 'city') {
    return 'createPost.mapInfo.wrongCity'
  }

  if (fieldName === 'password') {
    return 'userMenu.passwordError'
  }

  if (fieldName === 'passwordConfirmation') {
    return 'userMenu.passwordConfirmationError'
  }

  return 'form.requiredField'
}

export default getErrorMessage
