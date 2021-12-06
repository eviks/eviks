import getRequiredFields from './getRequiredFields';
import attributeIsValid from './attributeIsValid';
import getErrorMessage from './getErrorMessage';
import formValidationErrors from './formValidationErrors';

export const validationAttributeOnChange = (
  formName,
  name,
  value,
  state,
  setState,
) => {
  const attrName = name;

  const requiredFields = getRequiredFields(formName);

  if (!requiredFields.includes(name)) {
    setState({
      ...state,
      [attrName]: value,
    });
    return;
  }

  const updatedState = { ...state, [attrName]: value };

  const updatedValidationErrors = {
    [attrName]: !attributeIsValid(formName, updatedState, attrName)
      ? getErrorMessage(attrName, updatedState)
      : null,
  };

  setState({
    ...state,
    [attrName]: value,
    validationErrors: { ...state.validationErrors, ...updatedValidationErrors },
  });
};

export const validationOnSubmit = (formName, state, setState) => {
  const requiredFields = getRequiredFields(formName);
  const updatedValidationErrors = formValidationErrors(
    formName,
    state,
    requiredFields,
  );
  setState({
    ...state,
    validationErrors: { ...state.validationErrors, ...updatedValidationErrors },
  });

  let formIsValid = true;

  Object.values(updatedValidationErrors).forEach((value) => {
    if (value) formIsValid = false;
  });

  return formIsValid;
};
