import axios from 'axios'
import { GET_POSTS, POST_ERROR, ADD_POST } from './types'

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
    const res = await axios.post('/api/posts', data, config)
    dispatch({ type: ADD_POST, payload: res.data })
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
