import attributeIsValid from './attributeIsValid';
import getErrorMessage from './getErrorMessage';

const formValidationErrors = (formName, fields, requiredFields) => {
  let errors = {};

  requiredFields.forEach((requiredField) => {
    const result = attributeIsValid(formName, fields, requiredField);
    errors[requiredField] = !result.isValid
      ? getErrorMessage(requiredField, result.errorCode)
      : null;
  });

  return errors;
};

export default formValidationErrors;
