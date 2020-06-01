export default (fields, requiredFields) => {
  let errors = {}

  requiredFields.forEach(requiredField => {
    if (requiredField === 'photos') {
      errors[requiredField] = fields[requiredField].length < 3 ? true : false
    } else {
      errors[requiredField] = !fields[requiredField] ? true : false
    }
  })

  return errors
}
