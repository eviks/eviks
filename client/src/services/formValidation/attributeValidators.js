export const usernameIsValid = (formName, { username }) => {
  if (!username) return { isValid: false, errorCode: '0' }
  if (!/^[a-zA-Z0-9_-]+$/.test(username))
    return { isValid: false, errorCode: '1' }
  return { isValid: true }
}

export const passwordIsValid = (formName, { password }) => {
  if (formName === 'USER_SETTINGS') {
    return { isValid: password ? password.length >= 6 : true }
  } else {
    return { isValid: password.length >= 6 }
  }
}

export const passwordConfirmationIsValid = (
  formName,
  { password, passwordConfirmation }
) => {
  return { isValid: password ? passwordConfirmation === password : true }
}

export const descriptionIsValid = (formName, { description }) => {
  return { isValid: description.replace(/\s+/g, '').length >= 50 }
}

export const imagesAreValid = (formName, { images }) => {
  return { isValid: images.length >= 3 }
}

export const attributeValidators = {
  username: usernameIsValid,
  description: descriptionIsValid,
  images: imagesAreValid,
  password: passwordIsValid,
  passwordConfirmation: passwordConfirmationIsValid,
}
