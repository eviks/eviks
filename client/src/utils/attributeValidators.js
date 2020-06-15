export const descriptionIsValid = ({ description }) => {
  return description.length > 100
}

export const photosAreValid = ({ photos }) => {
  return photos.length >= 3
}

export const addressIsValid = form => {
  const { estateType } = form
  return form[estateType === 'apartment' ? 'houseNumber' : 'street'] !== ''
}

export const attributeValidators = {
  description: descriptionIsValid,
  photos: photosAreValid,
  address: addressIsValid
}
