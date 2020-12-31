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
  UPLOAD_IMAGE,
  DELETE_IMAGE,
  SET_FILTER,
  SET_FILTER_FROM_URL,
  REMOVE_ALL_FILTERS,
  CLEAN_FORM
} from '../actions/types'

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_POSTS:
      return { ...state, posts: { ...state.posts, ...payload } }
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
    case UPLOAD_IMAGE:
      return {
        ...state,
        postForm: {
          ...state.postForm,
          images: [...state.postForm.images, payload]
        }
      }
    case DELETE_IMAGE:
      return {
        ...state,
        postForm: {
          ...state.postForm,
          images: state.postForm.images.filter(image => image !== payload)
        }
      }
    case SET_FILTER:
      return {
        ...state,
        posts: {
          ...state.posts,
          filters: { ...state.posts.filters, ...payload }
        }
      }
    case SET_FILTER_FROM_URL:
    case REMOVE_ALL_FILTERS:
      return {
        ...state,
        posts: {
          ...state.posts,
          filters: { ...initialState.posts.filters, ...payload }
        }
      }
    case CLEAN_FORM:
      return {
        ...state,
        postForm: { ...initialState.postForm },
        formSteps: { ...initialState.formSteps },
        validationErrors: { ...initialState.validationErrors }
      }
    case POST_ERROR:
      return { ...state, error: payload }
    default:
      return state
  }
}
