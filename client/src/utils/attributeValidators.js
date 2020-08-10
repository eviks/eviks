export const descriptionIsValid = ({ description }) => {
  const value = description
  return value.replace(/\s+/g, '').length >= 50
}

export const photosAreValid = ({ photos }) => {
  return photos.length >= 3
}

export const attributeValidators = {
  description: descriptionIsValid,
  photos: photosAreValid
}
