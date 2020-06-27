import attribueIsValid from '../utils/attribueIsValid'
import getErrorMessage from '../utils/getErrorMessage'

export default (fields, requiredFields) => {
  let errors = {}

  requiredFields.forEach(requiredField => {
    errors[requiredField] = !attribueIsValid(fields, requiredField)
      ? getErrorMessage(requiredField, fields)
      : null
  })

  return errors
}
