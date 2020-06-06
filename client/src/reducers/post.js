import initialState from './initialStates/postInitialState'
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  ADD_POST,
  SET_POST_CREATED_FLAG,
  UPDATE_POST_FORM,
  FORM_NEXT_STEP,
  FORM_PREV_STEP,
  POST_VALIDATION_ERROR,
  UPLOAD_PHOTO,
  DELETE_PHOTO,
  SET_FILTER
} from '../actions/types'

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_POSTS:
      return { ...state, posts: payload }
    case GET_POST:
      return { ...state, post: payload }
    case ADD_POST:
      return {
        ...state,
        posts: { ...state.posts, result: [...state.posts.result, payload] },
        postForm: initialState.postForm,
        newPostCreated: true
      }
    case SET_POST_CREATED_FLAG:
      return { ...state, newPostCreated: payload }
    case UPDATE_POST_FORM:
      return {
        ...state,
        postForm: {
          ...state.postForm,
          ...payload
        },
        validationErrors: {
          ...state.validationErrors,
          ...action.validationErrors
        }
      }
    case FORM_NEXT_STEP:
    case FORM_PREV_STEP:
      return {
        ...state,
        formSteps: { ...state.formSteps, currentStep: payload }
      }
    case POST_VALIDATION_ERROR:
      return {
        ...state,
        validationErrors: payload
      }
    case UPLOAD_PHOTO:
      return {
        ...state,
        postForm: {
          ...state.postForm,
          photos: [...state.postForm.photos, payload]
        }
      }
    case DELETE_PHOTO:
      return {
        ...state,
        postForm: {
          ...state.postForm,
          photos: state.postForm.photos.filter(
            photo => photo.photoId !== payload
          )
        }
      }
    case SET_FILTER:
      return {
        ...state,
        filters: { ...state.filters, ...payload }
      }
    case POST_ERROR:
      return { ...state, error: payload }
    default:
      return state
  }
}
