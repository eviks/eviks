import getRequiredFields from '../utils/getRequiredFields'
import attribueIsValid from '../utils/attribueIsValid'

const ValidateAttributeUpdateMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  if (action.type !== 'UPDATE_POST_FORM') {
    return next(action)
  }

  const { payload } = action
  const state = getState()

  let attrName
  if (Object.keys(payload).includes('address')) {
    attrName = 'address'
  } else {
    attrName = Object.keys(payload)[0]
  }

  const requiredFields = getRequiredFields(
    'POST_FORM',
    state.post.formSteps.currentStep,
    state.post.postForm.estateType
  )

  if (!requiredFields.includes(attrName)) {
    return next(action)
  }

  const form = state.post.postForm
  let updatedForm = { ...form, ...payload }

  action.validationErrors = {
    [attrName]: !attribueIsValid(updatedForm, attrName)
      ? 'form.requiredField'
      : null
  }

  next(action)
}

export default ValidateAttributeUpdateMiddleware
