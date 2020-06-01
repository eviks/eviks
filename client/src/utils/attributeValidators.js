export const descriptionIsValid = ({ description }) => {
  return description.length > 100
}

export const photosAreValid = ({ photos }) => {
  return photos.length >= 3
}

export const attributeValidators = {
  description: descriptionIsValid,
  photos: photosAreValid
}
