import axios from 'axios'
import { asyncActionStart, asyncActionFinish, asyncActionError } from './async'
import { GET_POSTS, POST_ERROR, ADD_POST, UPLOAD_PHOTO } from './types'

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('api/posts')
    dispatch({ type: GET_POSTS, payload: res.data })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status
      }
    })
  }
}

// Add post
export const addPost = data => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    dispatch(asyncActionStart())
    const res = await axios.post('/api/posts', data, config)
    dispatch({ type: ADD_POST, payload: res.data })
    dispatch(asyncActionFinish())
    return res.data
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

// Upload photo
export const uploadPhoto = (data, photoId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    dispatch(asyncActionStart(photoId))
    const res = await axios.post('/api/posts/photo', data, config)
    dispatch({ type: UPLOAD_PHOTO, payload: res.data })
    dispatch(asyncActionFinish(photoId))
  } catch (error) {
    dispatch(asyncActionError(photoId))
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response
      }
    })
  }
}
