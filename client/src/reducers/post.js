import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  ADD_POST,
  UPLOAD_PHOTO,
  DELETE_PHOTO,
  SET_FILTER,
} from '../actions/types'

const initialState = {
  posts: [],
  post: null,
  uploadedPhotos: [],
  filters: {
    priceMin: 0,
    priceMax: 0,
    rooms: 0,
    estateType: null,
    sqmMin: 0,
    sqmMax: 0,
    livingSqmMin: 0,
    livingSqmMax: 0,
    kitchenSqmMin: 0,
    kitchenSqmMax: 0,
    totalFloorMin: 0,
    totalFloorMax: 0,
    floorMin: 0,
    floorMax: 0,
  },
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_POSTS:
      return { ...state, posts: payload }
    case GET_POST:
      return { ...state, post: payload }
    case ADD_POST:
      return { ...state, posts: [...state.posts, payload], uploadedPhotos: [] }
    case UPLOAD_PHOTO:
      return {
        ...state,
        uploadedPhotos: [...state.uploadedPhotos, payload],
      }
    case DELETE_PHOTO:
      return {
        ...state,
        uploadedPhotos: state.uploadedPhotos.filter(
          (photo) => photo.photoId !== payload
        ),
      }
    case SET_FILTER:
      return { ...state, filters: { ...state.filters, ...payload } }
    case POST_ERROR:
      return { ...state, error: payload }
    default:
      return state
  }
}
