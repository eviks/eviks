import axios from 'axios'
import { asyncActionStart, asyncActionFinish, asyncActionError } from './async'
import {
  ADD_POST_TO_FAVORITES,
  REMOVE_POST_FROM_FAVORITES,
  FAVORITES_ERROR,
  GET_USER_POSTS,
  USER_ERROR,
} from '../actions/types'

// Add post to user's favorites list
export const addPostToFavorites = (postId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    dispatch(asyncActionStart(`POST_ITEM_${postId}`))
    const res = await axios.post(`/api/users/favorites`, { postId }, config)
    dispatch({ type: ADD_POST_TO_FAVORITES, payload: res.data.favorites })
    dispatch(asyncActionFinish(`POST_ITEM_${postId}`))
    return {
      success: true,
      numberOfPosts: Object.keys(res.data.favorites).length,
    }
  } catch (error) {
    dispatch(asyncActionError(`POST_ITEM_${postId}`))
    dispatch({
      type: FAVORITES_ERROR,
      payload: {
        message: error.message,
      },
    })
    return { success: false }
  }
}

// Remove post from user's favorites list
export const removePostFromFavorites = (postId) => async (dispatch) => {
  try {
    dispatch(asyncActionStart(`POST_ITEM_${postId}`))
    const res = await axios.delete(`/api/users/favorites/${postId}`)
    dispatch({ type: REMOVE_POST_FROM_FAVORITES, payload: res.data.favorites })
    dispatch(asyncActionFinish(`POST_ITEM_${postId}`))
  } catch (error) {
    dispatch(asyncActionError(`POST_ITEM_${postId}`))
    dispatch({
      type: FAVORITES_ERROR,
      payload: {
        message: error.message,
      },
    })
  }
}

// Get list of all user's posts
export const getUserPosts = (userId) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())
    const res = await axios.get(`/api/users/${userId}/posts?limit=15`)
    dispatch({ type: GET_USER_POSTS, payload: res.data })
    dispatch(asyncActionFinish())
  } catch (error) {
    dispatch(asyncActionError())
    dispatch({
      type: USER_ERROR,
      payload: {
        message: error.message,
      },
    })
  }
}

export const deletePost = (postId) => async (dispatch) => {}
