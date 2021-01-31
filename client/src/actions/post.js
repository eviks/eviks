import axios from 'axios'
import { asyncActionStart, asyncActionFinish, asyncActionError } from './async'
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  ADD_POST_API,
  UPDATE_POST_FORM,
  GET_POST_FORM_DATA,
  FORM_NEXT_STEP,
  FORM_PREV_STEP,
  UPLOAD_IMAGE,
  DELETE_IMAGE,
  SET_FILTER,
  SET_FILTER_FROM_URL,
  REMOVE_ALL_FILTERS,
  CLEAN_FORM,
  DELETE_POST,
} from './types'
import { setURLParams } from '../utils/urlParams'
import { goMapGUID } from '../config'

// Get posts
export const getPosts = (filters) => async (dispatch) => {
  const filtersObj = { ...filters }
  if (!filtersObj.page) filtersObj.page = 1
  const url = setURLParams(filtersObj)
  try {
    dispatch(asyncActionStart('POST_LIST'))
    const res = await axios.get(`/api/posts/?${url && url + '&'}limit=${15}`)
    dispatch({ type: GET_POSTS, payload: res.data })
    dispatch(asyncActionFinish('POST_LIST'))
  } catch (error) {
    dispatch(asyncActionError('POST_LIST'))
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.message,
      },
    })
  }
}

// Get single post by ID
export const getPost = (postId) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())
    const res = await axios.get(`/api/posts/post/${postId}`)
    dispatch({ type: GET_POST, payload: res.data })
    dispatch(asyncActionFinish())
  } catch (error) {
    dispatch(asyncActionError())
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.message,
      },
    })
  }
}

// Add post
export const addPost = (data) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: ADD_POST_API, payload: data })
      dispatch({ type: CLEAN_FORM })
      resolve(true)
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          message: error.message,
        },
      })
      reject(false)
    }
  })
}

// Delete post
export const deletePost = (postId) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.delete(`/api/posts/${postId}`)
      dispatch({ type: DELETE_POST, payload: postId })
      resolve(true)
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          message: error.message,
        },
      })
    }
    reject(false)
  })
}

// Get post form data to edit post
export const getPostFormData = (postId, setImages) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())
    const res = await axios.get(`/api/posts/post/${postId}`)
    const data = res.data

    data.searchArea = [...data.location]
    data.city = data.city ? data.city.name : ''
    data.district = data.district ? data.district.name : ''
    data.subdistrict = data.subdistrict ? data.subdistrict.name : ''

    setImages(
      data.images.map((image) => {
        return {
          id: image,
          preview: `/uploads/post_images/${image}/image_320.png`,
        }
      })
    )

    dispatch({ type: GET_POST_FORM_DATA, payload: data })
    dispatch(asyncActionFinish())
  } catch (error) {
    dispatch(asyncActionError())
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.message,
      },
    })
  }
}

// Set post form fields
export const updatePostFormAttributes = (payload) => {
  return { type: UPDATE_POST_FORM, payload }
}

// Go to the next form step
export const formNextStep = (newStep) => async (dispatch) => {
  dispatch({ type: FORM_NEXT_STEP, payload: newStep })
}

// Go to the prev form step
export const formPrevStep = (newStep) => async (dispatch) => {
  newStep = Math.max(newStep, 0)
  dispatch({ type: FORM_PREV_STEP, payload: newStep })
}

// Update address suggestions
export const updateAddressSuggestions = (text, setDropdownList) => async (
  dispatch,
  getState
) => {
  const state = getState()

  let searchArea
  if (state.post.postForm.searchArea) {
    searchArea = state.post.postForm.searchArea
  } else {
    searchArea = state.post.postForm.location
  }

  if (text.length < 3) {
    setDropdownList([])
    return
  }

  dispatch(asyncActionStart())

  const config = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  }

  try {
    const res = await axios.post(
      `https://cors-anywhere.herokuapp.com/https://gomap.az/maps/search/index/az?q=${text}&lon=${searchArea[0]}&lat=${searchArea[1]}`,
      {},
      config
    )

    const list = res.data.rows
      .filter((row) => row.nm !== 'Yeni ünvan')
      .slice(0, 5)
    setDropdownList(list)
    dispatch(asyncActionFinish())
  } catch (error) {
    dispatch(asyncActionError())
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.message,
      },
    })
  }
}

export const getAddressByCoords = (coords) => async (dispatch) => {
  dispatch(asyncActionStart('mapIsLoading'))

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  }

  try {
    const res = await axios.post(
      'https://cors-anywhere.herokuapp.com/http://api.gomap.az/Main.asmx/getAddressByCoords',
      {
        guid: goMapGUID,
        lng: 'az',
        x: coords[0],
        y: coords[1],
      },
      config
    )

    const data = JSON.parse(res.data.replace('{"d":null}', ''))

    let newAttributes = {
      city: '',
      district: '',
      subdistrict: '',
      address: '',
      location: coords,
    }

    if (data.success) {
      data.addr_components.forEach((addressComponent) => {
        if (addressComponent.type === 'country district')
          newAttributes.city = addressComponent.name
        if (addressComponent.type === 'settlement district')
          newAttributes.district = addressComponent.name
        if (addressComponent.type === 'settlement')
          newAttributes.subdistrict = addressComponent.name
        if (addressComponent.type === 'street')
          newAttributes.address = addressComponent.name
      })
    }

    // Check if district is empty
    if (newAttributes.district === '' && newAttributes.subdistrict !== '') {
      newAttributes.district = newAttributes.subdistrict
      newAttributes.subdistrict = ''
    }

    dispatch(updatePostFormAttributes(newAttributes))
    dispatch(asyncActionFinish('mapIsLoading'))
  } catch (error) {
    console.log(error)
    dispatch(asyncActionError('mapIsLoading'))
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.message,
      },
    })
  }
}

// Upload image
export const uploadImage = (data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }

  const id = data.get('id')

  try {
    dispatch(asyncActionStart(id))
    await axios.post('/api/posts/upload_image', data, config)
    dispatch({ type: UPLOAD_IMAGE, payload: id })
    dispatch(asyncActionFinish(id))
  } catch (error) {
    dispatch(asyncActionError(id))
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.message,
      },
    })
  }
}

// Delete image
export const deleteImage = (id) => async (dispatch) => {
  try {
    dispatch(asyncActionStart(id))
    await axios.delete(`/api/posts/delete_image/${id}`)
    dispatch({ type: DELETE_IMAGE, payload: id })
    dispatch(asyncActionFinish(id))
  } catch (error) {
    dispatch(asyncActionError(id))
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.message,
      },
    })
  }
}

// Set search filter
export const setSrearchFilters = (filters) => async (dispatch) => {
  dispatch({ type: SET_FILTER, payload: filters })
}

// Set search filter from URL string
export const setSrearchFiltersFromURL = (filters) => async (dispatch) => {
  dispatch({ type: SET_FILTER_FROM_URL, payload: filters })
}

// Remove all filters
export const removeAllFilters = () => async (dispatch, getState) => {
  const state = getState()
  const filters = state.post.posts.filters
  const payload = { cityId: filters.cityId, dealType: filters.dealType }
  dispatch({ type: REMOVE_ALL_FILTERS, payload })
}

// Update search parameters in URL
export const updateURLParams = (newFilters, history, page = 1) => async (
  dispatch,
  getState
) => {
  const state = getState()

  const filters = { ...state.post.posts.filters, ...newFilters }
  delete filters.cityId
  delete filters.dealType

  delete filters.page
  filters.page = page

  Object.keys(filters).forEach((key) => !filters[key] && delete filters[key])

  const url = setURLParams(filters)
  history.push(`?${url || ''}`)
}

// Clean post form attributes
export const cleanPostForm = () => async (dispatch) => {
  dispatch({ type: CLEAN_FORM })
}
