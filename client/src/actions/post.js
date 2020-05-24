import axios from 'axios'
import { asyncActionStart, asyncActionFinish, asyncActionError } from './async'
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  ADD_POST,
  UPLOAD_PHOTO,
  DELETE_PHOTO,
  SET_FILTER,
} from './types'

// Get posts
export const getPosts = (filters = null) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())
    const res = await axios.get(`api/posts/${JSON.stringify(filters)}`)
    dispatch({ type: GET_POSTS, payload: res.data })
    dispatch(asyncActionFinish())
  } catch (error) {
    dispatch(asyncActionError())
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

// Get single post
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())
    const res = await axios.get(`/api/posts/post/${id}`)
    dispatch({ type: GET_POST, payload: res.data })
    dispatch(asyncActionFinish())
  } catch (error) {
    dispatch(asyncActionError())
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

// Add post
export const addPost = (data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    dispatch(asyncActionStart())
    const res = await axios.post('/api/posts', data, config)
    dispatch({ type: ADD_POST, payload: res.data })
    dispatch(asyncActionFinish())
    return res.data
  } catch (error) {
    console.log(error)
    dispatch(asyncActionError())
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response,
      },
    })
  }
}

// Upload photo
export const uploadPhoto = (data, photoId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  try {
    dispatch(asyncActionStart(photoId))
    const res = await axios.post('/api/posts/upload_photo', data, config)
    const payload = res.data
    Object.assign(payload, { photoId })
    dispatch({ type: UPLOAD_PHOTO, payload })
    dispatch(asyncActionFinish(photoId))
  } catch (error) {
    dispatch(asyncActionError(photoId))
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response,
      },
    })
  }
}

// Delete photo
export const deletePhoto = (filename) => async (dispatch) => {
  try {
    dispatch(asyncActionStart(filename))
    await axios.delete(`/api/posts/delete_photo/${filename}`)
    dispatch({ type: DELETE_PHOTO, filename })
    dispatch(asyncActionFinish(filename))
  } catch (error) {
    dispatch(asyncActionError(filename))
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response,
      },
    })
  }
}

// Set search filter
export const setSrearchFilters = (filters) => async (dispatch) => {
  dispatch({ type: SET_FILTER, payload: filters })
}
