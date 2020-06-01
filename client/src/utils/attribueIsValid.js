import { attributeValidators } from './attributeValidators'

export default (form, attribute) => {
  if (attributeValidators[attribute]) {
    return attributeValidators[attribute](form)
  } else {
    return form[attribute] ? true : false
  }
}
