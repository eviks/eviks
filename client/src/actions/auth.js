import axios from 'axios'
import { setAlert } from './alert'
import { asyncActionStart, asyncActionFinish, asyncActionError } from './async'
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
  ADD_POST_TO_FAVORITES,
  REMOVE_POST_FROM_FAVORITES,
  FAVORITES_ERROR
} from './types'
import setAuthToken from '../utils/setAuthToken'
import uuid from 'uuid'

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get('/api/auth')
    dispatch({ type: USER_LOADED, payload: res.data })
  } catch (error) {
    dispatch({ type: AUTH_ERROR })
  }
}

// Register user
export const registerUser = credentials => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify(credentials)
    dispatch(asyncActionStart())
    await axios.post('/api/users/', body, config)
    dispatch(asyncActionFinish())
    return true
  } catch (error) {
    dispatch(asyncActionError())
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(error => {
        const id = uuid.v4()
        dispatch(setAlert(error.msg, 'danger', id))
      })
    }
    dispatch({ type: VERIFICATION_FAIL })
    return false
  }
}

// Verify user email
export const verifyEmail = activationToken => async dispatch => {
  try {
    dispatch(asyncActionStart())
    const res = await axios.post(`/api/auth/verification/${activationToken}`)
    dispatch({ type: VERIFICATION_SUCCESS, payload: res.data })
    dispatch(asyncActionFinish())
    dispatch(loadUser())
  } catch (error) {
    dispatch(asyncActionError())
    dispatch({ type: VERIFICATION_FAIL })
  }
}

// Login user
export const login = (email, password) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ email, password })
    dispatch(asyncActionStart())
    const res = await axios.post('/api/auth', body, config)
    dispatch({ type: LOGIN_SUCCESS, payload: res.data })
    dispatch(loadUser())
    dispatch(asyncActionFinish())
  } catch (error) {
    dispatch(asyncActionError())
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({ type: LOGIN_FAIL })
  }
}

// Send reset password token
export const sendResetPasswordToken = email => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ email })
    dispatch(asyncActionStart())
    await axios.post('/api/auth/create_reset_password_token/', body, config)
    dispatch(asyncActionFinish())
    return true
  } catch (error) {
    dispatch(asyncActionError())
    dispatch(setAlert(error.message, 'danger', uuid.v4()))
    return false
  }
}

// Check reset password token
export const checkResetPasswordToken = token => async dispatch => {
  try {
    dispatch(asyncActionStart())
    await axios.post(`/api/auth/check_reset_password_token/${token}`)
    dispatch({ type: RESET_TOKEN_CHECK_SUCCESS })
    dispatch(asyncActionFinish())
  } catch (error) {
    dispatch(asyncActionError())
    dispatch({ type: RESET_TOKEN_CHECK_FAIL })
  }
}

// Reset password
export const resetPassword = (
  token,
  password,
  confirm,
  history
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    dispatch(asyncActionStart())
    console.log(password, confirm)
    const body = JSON.stringify({ password, confirm })
    const res = await axios.post(
      `/api/auth/password_reset/${token}`,
      body,
      config
    )
    dispatch({ type: RESETPASSWORD_SUCCESS, payload: res.data })
    dispatch(loadUser())
    dispatch(asyncActionFinish())
    history.push('/')
  } catch (error) {
    dispatch(asyncActionError())
    dispatch({ type: RESETPASSWORD_FAIL })
  }
}

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT })
}

// Add post to user's favorites list
export const addPostToFavorites = postId => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    dispatch(asyncActionStart())
    const res = await axios.post(`/api/users/favorites`, { postId }, config)
    dispatch({ type: ADD_POST_TO_FAVORITES, payload: res.data.favorites })
    dispatch(asyncActionFinish())
    return {
      success: true,
      numberOfPosts: Object.keys(res.data.favorites).length
    }
  } catch (error) {
    dispatch(asyncActionError())
    dispatch({
      type: FAVORITES_ERROR,
      payload: {
        message: error.message
      }
    })
    return { success: false }
  }
}

// Remove post from user's favorites list
export const removePostFromFavorites = postId => async dispatch => {
  try {
    dispatch(asyncActionStart())
    const res = await axios.delete(`/api/users/favorites/${postId}`)
    dispatch({ type: REMOVE_POST_FROM_FAVORITES, payload: res.data.favorites })
    dispatch(asyncActionFinish())
  } catch (error) {
    dispatch(asyncActionError())
    dispatch({
      type: FAVORITES_ERROR,
      payload: {
        message: error.message
      }
    })
  }
}
