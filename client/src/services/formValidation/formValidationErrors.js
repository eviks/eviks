import attribueIsValid from './attribueIsValid'
import getErrorMessage from './getErrorMessage'

const formValidationErrors = (fields, requiredFields) => {
  let errors = {}

  requiredFields.forEach((requiredField) => {
    errors[requiredField] = !attribueIsValid(fields, requiredField)
      ? getErrorMessage(requiredField, fields)
      : null
  })

  return errors
}

export default formValidationErrors
