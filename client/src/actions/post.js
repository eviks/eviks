import axios from 'axios'
import { asyncActionStart, asyncActionFinish, asyncActionError } from './async'
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  ADD_POST_API,
  SET_POST_CREATED_FLAG,
  UPDATE_POST_FORM,
  FORM_NEXT_STEP,
  FORM_PREV_STEP,
  UPLOAD_PHOTO,
  DELETE_PHOTO,
  SET_FILTER,
  REMOVE_FILTERS,
  CLEAN_FORM
} from './types'
import { setURLParams } from '../utils/urlParams'

// Get posts
export const getPosts = (page = 1, filters, history) => async dispatch => {
  try {
    const url = setURLParams({ ...filters })
    history.push(`?${url || ''}`)
    dispatch(asyncActionStart())
    const res = await axios.get(
      `api/posts/?${url && url + '&'}limit=${15}&page=${page}`
    )
    dispatch({ type: GET_POSTS, payload: res.data })
    dispatch(asyncActionFinish())
  } catch (error) {
    dispatch(asyncActionError())
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status
      }
    })
  }
}

// Get single post
export const getPost = id => async dispatch => {
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
        status: error.response.status
      }
    })
  }
}

// Add post
export const addPost = data => async dispatch => {
  try {
    dispatch(asyncActionStart())
    dispatch({ type: ADD_POST_API, payload: data })
    dispatch(asyncActionFinish())
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

export const setPostCreatedFlag = flag => async dispatch => {
  dispatch({ type: SET_POST_CREATED_FLAG, payload: flag })
}

// Set post form fields
export const updatePostFormAttributes = payload => {
  return { type: UPDATE_POST_FORM, payload }
}

// Go to the next form step
export const formNextStep = newStep => async dispatch => {
  dispatch({ type: FORM_NEXT_STEP, payload: newStep })
}

// Go to the prev form step
export const formPrevStep = newStep => async dispatch => {
  newStep = Math.max(newStep, 0)
  dispatch({ type: FORM_PREV_STEP, payload: newStep })
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
        status: error.response
      }
    })
  }
}

// Delete photo
export const deletePhoto = (photoId, filename) => async dispatch => {
  try {
    dispatch(asyncActionStart(filename))
    await axios.delete(`/api/posts/delete_photo/${filename}`)
    dispatch({ type: DELETE_PHOTO, payload: photoId })
    dispatch(asyncActionFinish(filename))
  } catch (error) {
    dispatch(asyncActionError(filename))
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response
      }
    })
  }
}

// Set search filter
export const setSrearchFilters = filters => async dispatch => {
  dispatch({ type: SET_FILTER, payload: filters })
}

// Remove all search filters
export const removeFilters = () => async dispatch => {
  dispatch({ type: REMOVE_FILTERS })
}

// Clean post form attributes
export const cleanPostForm = () => async dispatch => {
  dispatch({ type: CLEAN_FORM })
}
