import { ADD_POST, POST_ERROR } from '../actions/types'
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../actions/async'
import axios from 'axios'

const addPostMiddleware = ({ dispatch, getState }) => next => async action => {
  if (action.type !== 'ADD_POST_API') {
    return next(action)
  }

  dispatch(asyncActionStart())
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/posts', action.payload, config)
    action.result = true
    dispatch({ type: ADD_POST, payload: res.data })
    dispatch(asyncActionFinish())
    next(action)
  } catch (error) {
    dispatch(asyncActionError())
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response
      }
    })
  }
}

export default addPostMiddleware
