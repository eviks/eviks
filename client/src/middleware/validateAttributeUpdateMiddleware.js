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
  let errorMessage
  if (Object.keys(payload).includes('address')) {
    attrName = 'address'
    errorMessage =
      state.post.postForm.estateType === 'apartment'
        ? 'createPost.mapInfo.wrongApartment'
        : 'createPost.mapInfo.wrongHouse'
  } else {
    attrName = Object.keys(payload)[0]
    errorMessage = 'form.requiredField'
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
    [attrName]: !attribueIsValid(updatedForm, attrName) ? errorMessage : null
  }

  next(action)
}

export default ValidateAttributeUpdateMiddleware
