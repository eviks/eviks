import axios from 'axios'
import { setAlert } from './alert'
import { asyncActionStart, asyncActionFinish, asyncActionError } from './async'
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
  LOGOUT,
  UPDATE_USER,
  ADD_POST_TO_FAVORITES,
  REMOVE_POST_FROM_FAVORITES,
  AUTH_ERROR,
} from './types'
import setAuthToken from '../utils/setAuthToken'
import uuid from 'uuid'
import { baseUrl } from '../App'

// Load user
export const loadUser = () => async (dispatch) => {
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
export const registerUser = (credentials) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify(credentials)
  dispatch(asyncActionStart())
  try {
    await axios.post('/api/users/', body, config)
    dispatch(asyncActionFinish())
    return true
  } catch (error) {
    dispatch(asyncActionError())
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach((error) => {
        const id = uuid.v4()
        dispatch(setAlert(error.msg, 'danger', id))
      })
    }
    dispatch({ type: AUTH_ERROR })
    return false
  }
}

// Verify user email
export const verifyEmail = (activationToken) => async (dispatch) => {
  dispatch(asyncActionStart())
  try {
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
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({ email, password })
  dispatch(asyncActionStart())
  try {
    const res = await axios.post('/api/auth', body, config)
    dispatch({ type: LOGIN_SUCCESS, payload: res.data })
    dispatch(loadUser())
    dispatch(asyncActionFinish())
  } catch (error) {
    dispatch(asyncActionError())
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({ type: LOGIN_FAIL })
  }
}

// Send reset password token
export const sendResetPasswordToken = (email) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({ email })
  dispatch(asyncActionStart())
  try {
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
export const checkResetPasswordToken = (token) => async (dispatch) => {
  dispatch(asyncActionStart())
  try {
    await axios.post(`/api/auth/check_reset_password_token/${token}`)
    dispatch({ type: RESET_TOKEN_CHECK_SUCCESS })
    dispatch(asyncActionFinish())
  } catch (error) {
    dispatch(asyncActionError())
    dispatch({ type: RESET_TOKEN_CHECK_FAIL })
  }
}

// Reset password
export const resetPassword = (token, password, confirm, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  dispatch(asyncActionStart())
  try {
    const body = JSON.stringify({ password, confirm })
    const res = await axios.post(
      `/api/auth/password_reset/${token}`,
      body,
      config
    )
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.data })
    dispatch(loadUser())
    dispatch(asyncActionFinish())
    history.push(`${baseUrl}/`)
  } catch (error) {
    dispatch(asyncActionError())
    dispatch({ type: RESETPASSWORD_FAIL })
  }
}

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT })
}

// Update user settings
export const updateUser = (userData) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    dispatch(asyncActionStart())
    try {
      const result = await axios.put('/api/users/', userData, config)
      dispatch({ type: UPDATE_USER, payload: result })
      resolve(true)
    } catch (error) {
      dispatch(asyncActionError())
      dispatch({
        type: AUTH_ERROR,
        payload: {
          message: error.response.statusText,
          status: error.response,
        },
      })
      reject(false)
    }
  })
}

// Add post to user's favorites list
export const addPostToFavorites = (postId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  dispatch(asyncActionStart(`POST_ITEM_${postId}`))
  try {
    const res = await axios.put(
      `/api/users/add_to_favorites/${postId}`,
      null,
      config
    )
    dispatch({ type: ADD_POST_TO_FAVORITES, payload: res.data.favorites })
    dispatch(asyncActionFinish(`POST_ITEM_${postId}`))
    return {
      success: true,
      numberOfPosts: Object.keys(res.data.favorites).length,
    }
  } catch (error) {
    dispatch(asyncActionError(`POST_ITEM_${postId}`))
    dispatch({
      type: AUTH_ERROR,
      payload: {
        message: error.message,
      },
    })
    return { success: false }
  }
}

// Remove post from user's favorites list
export const removePostFromFavorites = (postId) => async (dispatch) => {
  dispatch(asyncActionStart(`POST_ITEM_${postId}`))
  try {
    const res = await axios.put(`/api/users/remove_from_favorites/${postId}`)
    dispatch({ type: REMOVE_POST_FROM_FAVORITES, payload: res.data.favorites })
    dispatch(asyncActionFinish(`POST_ITEM_${postId}`))
  } catch (error) {
    dispatch(asyncActionError(`POST_ITEM_${postId}`))
    dispatch({
      type: AUTH_ERROR,
      payload: {
        message: error.message,
      },
    })
  }
}
