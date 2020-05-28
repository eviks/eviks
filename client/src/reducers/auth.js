import {
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL,
  RESET_TOKEN_CHECK_SUCCESS,
  RESET_TOKEN_CHECK_FAIL,
  RESETPASSWORD_SUCCESS,
  RESETPASSWORD_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  validResetPasswordToken: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case USER_LOADED:
      return { ...state, isAuthenticated: true, user: payload }
    case VERIFICATION_SUCCESS:
    case RESETPASSWORD_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return { ...state, ...payload, isAuthenticated: true }
    case RESET_TOKEN_CHECK_SUCCESS:
      return { ...state, validResetPasswordToken: true }
    case AUTH_ERROR:
    case VERIFICATION_FAIL:
    case RESET_TOKEN_CHECK_FAIL:
    case RESETPASSWORD_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        validResetPasswordToken: false,
      }
    default:
      return state
  }
}
