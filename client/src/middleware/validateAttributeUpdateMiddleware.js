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
  const attrName = Object.keys(payload)[0]

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
  }

  next(action)
}

export default ValidateAttributeUpdateMiddleware
