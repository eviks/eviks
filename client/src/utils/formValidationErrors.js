export default (fields, requiredFields) => {
  let errors = {}

  let defaultErrorMessage = 'form.requiredField'

  requiredFields.forEach(requiredField => {
    if (requiredField === 'photos') {
      errors[requiredField] =
        fields[requiredField].length < 3 ? defaultErrorMessage : null
    } else if (requiredField === 'address') {
      // Check country & street / house number
      const errorMessage =
        fields.estateType === 'apartment'
          ? 'createPost.mapInfo.wrongApartment'
          : 'createPost.mapInfo.wrongHouse'

      const fieldName =
        fields.estateType === 'apartment' ? 'houseNumber' : 'street'

      errors.address =
        !fields[fieldName] || fields.country !== 'Azərbaycan'
          ? errorMessage
          : null
    } else {
      errors[requiredField] = !fields[requiredField]
        ? defaultErrorMessage
        : null
    }
  })

  return errors
}
