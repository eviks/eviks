export const descriptionIsValid = ({ description }) => {
  const value = description
  return value.replace(/\s+/g, '').length >= 50
}

export const imagesAreValid = ({ images }) => {
  return images.length >= 3
}

export const attributeValidators = {
  description: descriptionIsValid,
  images: imagesAreValid
}
