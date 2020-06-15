export default (fields, requiredFields) => {
  let errors = {}

  let defaultErrorMessage = 'form.requiredField'

  requiredFields.forEach(requiredField => {
    if (requiredField === 'photos') {
      errors[requiredField] =
        fields[requiredField].length < 3 ? defaultErrorMessage : null
    } else if (requiredField === 'address') {
      // Check country & street / house number
      const fieldName =
        fields.estateType === 'apartment' ? 'houseNumber' : 'street'
      errors.address = !fields[fieldName] ? 'Wrong address!' : null
    } else {
      errors[requiredField] = !fields[requiredField]
        ? defaultErrorMessage
        : null
    }
  })

  return errors
}
