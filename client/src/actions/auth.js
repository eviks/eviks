import axios from 'axios'
import { setAlert } from './alert'
import { VERIFICATION_SUCCESS, VERIFICATION_FAIL } from './types'

// Register user
export const register = activationToken => async dispatch => {
  try {
    const params = {
      activationToken
    }
    await axios.post('/api/auth/verification', params)
    dispatch({ type: VERIFICATION_SUCCESS })
  } catch (error) {
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({ type: VERIFICATION_FAIL })
  }
}
