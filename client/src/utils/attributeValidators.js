export const descriptionIsValid = ({ description }) => {
  return description.length >= 100
}

export const photosAreValid = ({ photos }) => {
  return photos.length >= 3
}

export const addressIsValid = form => {
  // Check country & street / house number
  const fieldName = form.estateType === 'apartment' ? 'houseNumber' : 'street'
  return form[fieldName] !== '' && form.country === 'Azərbaycan'
}

export const attributeValidators = {
  description: descriptionIsValid,
  photos: photosAreValid,
  address: addressIsValid
}
