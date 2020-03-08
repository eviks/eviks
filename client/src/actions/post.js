import axios from 'axios'
import { GET_POSTS, POST_ERROR } from './types'

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
