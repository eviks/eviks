import axios from 'axios'
import { setAlert } from './alert'
import { asyncActionStart, asyncActionFinish, asyncActionError } from './async'
import {
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT
} from './types'
import setAuthToken from '../utils/setAuthToken'

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    dispatch(asyncActionStart())
    const res = await axios.get('/api/auth')
    dispatch({ type: USER_LOADED, payload: res.data })
    dispatch(asyncActionFinish())
  } catch (error) {
    dispatch(asyncActionError())
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
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({ type: VERIFICATION_FAIL })
  }
}

// Verify user email
export const verifyEmail = activationToken => async dispatch => {
  try {
    const res = await axios.post(`/api/auth/verification/${activationToken}`)
    dispatch({ type: VERIFICATION_SUCCESS, payload: res.data })
    dispatch(loadUser())
  } catch (error) {
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
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

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT })
}
