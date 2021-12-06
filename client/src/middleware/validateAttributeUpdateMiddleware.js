import getRequiredFields from '../services/formValidation/getRequiredFields';
import attributeIsValid from '../services/formValidation/attributeIsValid';
import getErrorMessage from '../services/formValidation/getErrorMessage';

const validateAttributeUpdateMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type !== 'UPDATE_POST_FORM') {
      return next(action);
    }

    const { payload } = action;
    const state = getState();

    let attrName;
    if (Object.keys(payload).includes('address')) {
      attrName = 'address';
    } else {
      attrName = Object.keys(payload)[0];
    }

    const requiredFields = getRequiredFields('POST_FORM', {
      currentStep: state.post.formSteps.currentStep,
      estateType: state.post.postForm.estateType,
    });

    if (!requiredFields.includes(attrName)) {
      return next(action);
    }

    const form = state.post.postForm;
    let updatedForm = { ...form, ...payload };

    action.validationErrors = {
      [attrName]: !attributeIsValid('POST_FORM', updatedForm, attrName)
        ? getErrorMessage(attrName, updatedForm)
        : null,
    };

    next(action);
  };

export default validateAttributeUpdateMiddleware;
