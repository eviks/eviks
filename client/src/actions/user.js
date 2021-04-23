import axios from 'axios'
import { asyncActionStart, asyncActionFinish, asyncActionError } from './async'
import { GET_USER, USER_ERROR } from './types'

// Get user
export const getUser = (username) => async (dispatch) => {
  dispatch(asyncActionStart('USER_PROFILE'))
  try {
    const res = await axios.get(`/api/users/${username}`)
    dispatch({ type: GET_USER, payload: res.data })
    dispatch(asyncActionFinish('USER_PROFILE'))
  } catch (error) {
    dispatch(asyncActionError('USER_PROFILE'))
    dispatch({
      type: USER_ERROR,
      payload: {
        message: error.message,
      },
    })
  }
}
