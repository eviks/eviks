import { attributeValidators } from './attributeValidators'

const attributeIsValid = (form, attribute) => {
  if (attributeValidators[attribute]) {
    return attributeValidators[attribute](form)
  } else {
    return form[attribute] ? true : false
  }
}

export default attributeIsValid
