import {
  VERIFICATION_SUCCESS,
  RESET_TOKEN_CHECK_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  UPDATE_USER,
  DELETE_USER,
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
    case LOGOUT:
    case DELETE_USER:
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
