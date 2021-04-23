import formValidationErrors from '../services/formValidation/formValidationErrors'
import getRequiredFields from '../services/formValidation/getRequiredFields'
import { POST_VALIDATION_ERROR } from '../actions/types'

const formValidationMiddleware = ({ dispatch, getState }) => (next) => (
  action
) => {
  if (action.type !== 'FORM_NEXT_STEP') {
    return next(action)
  }

  const state = getState()

  const fields = state.post.postForm
  const requiredFields = getRequiredFields('POST_FORM', {
    currentStep: state.post.formSteps.currentStep,
    estateType: fields.estateType,
  })

  const validationErrors = formValidationErrors(
    'POST_FORM',
    fields,
    requiredFields
  )
  dispatch({ type: POST_VALIDATION_ERROR, payload: validationErrors })

  let formIsValid = true

  Object.values(validationErrors).forEach((value) => {
    if (value) formIsValid = false
  })

  if (formIsValid) next(action)
}

export default formValidationMiddleware
