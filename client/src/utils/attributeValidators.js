export const descriptionIsValid = ({ description }) => {
  const value = description
  return value.replace(/\s+/g, '').length >= 50
}

export const imagesAreValid = ({ images }) => {
  return images.length >= 3
}

export const passwordIsValid = ({ password }) => {
  return password ? password.length >= 6 : true
}

export const passwordConfirmationIsValid = ({
  password,
  passwordConfirmation,
}) => {
  return password ? passwordConfirmation === password : true
}

export const attributeValidators = {
  description: descriptionIsValid,
  images: imagesAreValid,
  password: passwordIsValid,
  passwordConfirmation: passwordConfirmationIsValid,
}
