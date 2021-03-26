import {
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL,
  RESET_TOKEN_CHECK_SUCCESS,
  RESET_TOKEN_CHECK_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESETPASSWORD_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  UPDATE_USER,
  ADD_POST_TO_FAVORITES,
  REMOVE_POST_FROM_FAVORITES,
} from '../actions/types'

const initialState = {
  userIsLoading: true,
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  validResetPasswordToken: null,
}

const authReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_LOADED:
    case UPDATE_USER:
      return {
        ...state,
        userIsLoading: false,
        isAuthenticated: true,
        user: payload,
      }
    case VERIFICATION_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        userIsLoading: false,
        isAuthenticated: true,
      }
    case RESET_TOKEN_CHECK_SUCCESS:
      return { ...state, userIsLoading: false, validResetPasswordToken: true }
    case AUTH_ERROR:
    case VERIFICATION_FAIL:
    case RESET_TOKEN_CHECK_FAIL:
    case RESETPASSWORD_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        userIsLoading: false,
        token: null,
        isAuthenticated: false,
        validResetPasswordToken: false,
      }
    case ADD_POST_TO_FAVORITES:
    case REMOVE_POST_FROM_FAVORITES:
      return {
        ...state,
        userIsLoading: false,
        user: {
          ...state.user,
          favorites: payload,
        },
      }
    default:
      return state
  }
}

export default authReducer
