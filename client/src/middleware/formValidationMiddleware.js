import formValidationErrors from '../utils/formValidationErrors'
import getRequiredFields from '../utils/getRequiredFields'
import { POST_VALIDATION_ERROR } from '../actions/types'

const formValidationMiddleware = ({ dispatch, getState }) => next => action => {
  if (action.type !== 'FORM_NEXT_STEP' && action.type !== 'ADD_POST_API') {
    return next(action)
  }

  const state = getState()

  const fields = state.post.postForm
  const requiredFields = getRequiredFields(
    'POST_FORM',
    state.post.formSteps.currentStep,
    fields.estateType
  )

  const validationErrors = formValidationErrors(fields, requiredFields)
  dispatch({ type: POST_VALIDATION_ERROR, payload: validationErrors })

  if (!Object.values(validationErrors).includes(true)) {
    next(action)
  }
}

export default formValidationMiddleware
