import { GET_POSTS, POST_ERROR, ADD_POST, UPLOAD_PHOTO } from '../actions/types'

const initialState = {
  posts: [],
  post: null,
  uploadedPhotos: [],
  error: {}
}

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_POSTS:
      return { ...state, posts: payload }
    case ADD_POST:
      return { ...state, posts: [...state.posts, payload] }
    case UPLOAD_PHOTO:
      return {
        ...state,
        uploadedPhotos: [...state.uploadedPhotos, payload]
      }
    case POST_ERROR:
      return { ...state, error: payload }
    default:
      return state
  }
}
