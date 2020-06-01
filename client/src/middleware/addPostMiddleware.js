import { ADD_POST, POST_ERROR } from '../actions/types'
import { asyncActionError } from '../actions/async'
import axios from 'axios'

const addPostMiddleware = ({ dispatch, getState }) => next => async action => {
  if (action.type !== 'ADD_POST_API') {
    return next(action)
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/posts', action.payload, config)
    action.result = true
    dispatch({ type: ADD_POST, payload: res.data })
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
