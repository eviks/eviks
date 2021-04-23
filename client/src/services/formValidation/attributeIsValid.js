import { attributeValidators } from './attributeValidators'

const attributeIsValid = (formName, form, attribute) => {
  if (attributeValidators[attribute]) {
    return attributeValidators[attribute](formName, form)
  } else {
    return form[attribute] ? { isValid: true } : { isValid: false }
  }
}

export default attributeIsValid
