import axios from 'axios'
import { asyncActionStart, asyncActionFinish, asyncActionError } from './async'
import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  UPDATE_POST,
  POST_ERROR,
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
  CLEAN_POSTS,
  DELETE_POST,
} from './types'
import { setURLParams } from '../services/util'

// Get posts
export const getPosts = (filters) => async (dispatch) => {
  const filtersObj = { ...filters }
  if (!filtersObj.page) filtersObj.page = 1
  const url = setURLParams(filtersObj)
  dispatch(asyncActionStart('POST_LIST'))
  try {
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
  dispatch(asyncActionStart())
  try {
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

// Create new / update existing post
export const createUpdatePost = (data) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(asyncActionStart())
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      // Request for city ID.
      const cityRequest = await axios.get(
        `/api/localities/?type=2&name=${data.city}`
      )

      const city = cityRequest.data[0]

      const post = {
        ...data,
        city: { id: city.id, name: city.name },
      }

      // District ID
      if (post.district) {
        post.district = city.children.filter(
          (child) => child.name === post.district
        )[0]
      }

      // Request for subdistrict ID
      if (post.subdistrict) {
        const districtRequest = await axios.get(
          `/api/localities/?id=${post.district.id}`
        )

        const district = districtRequest.data[0]

        post.subdistrict = district.children.filter(
          (child) => child.name === post.subdistrict
        )[0]
      }

      if (post._id) {
        // Update post
        const res = await axios.put(`/api/posts/${post._id}`, post, config)
        dispatch({ type: UPDATE_POST, payload: res.data })
      } else {
        // Add post
        const res = await axios.post('/api/posts', post, config)
        dispatch({ type: ADD_POST, payload: res.data })
      }

      dispatch(asyncActionFinish())

      resolve(true)
    } catch (error) {
      dispatch(asyncActionError())
      dispatch({
        type: POST_ERROR,
        payload: {
          message: error.response.statusText,
          status: error.response,
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
  dispatch(asyncActionStart())
  try {
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
  const searchArea = state.post.postForm.searchArea

  if (text.length < 3) {
    setDropdownList([])
    return
  }

  dispatch(asyncActionStart())

  try {
    const res = await axios.get(
      `/api/posts/geocoder?q=${text}&lon=${searchArea[0]}&lat=${searchArea[1]}`
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

// Get address by coords
export const getAddressByCoords = (coords) => async (dispatch) => {
  dispatch(asyncActionStart('mapIsLoading'))

  try {
    const res = await axios.post('/api/posts/getAddressByCoords', {
      lng: 'az',
      x: coords[0],
      y: coords[1],
    })

    let newAttributes = {
      city: '',
      district: '',
      subdistrict: '',
      address: '',
      location: coords,
    }

    if (res.data.success) {
      res.data.addr_components.forEach((addressComponent) => {
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

  dispatch(asyncActionStart(id))
  try {
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
export const deleteImage = (postId, id) => async (dispatch) => {
  dispatch(asyncActionStart(id))
  try {
    if (!postId) await axios.delete(`/api/posts/delete_image/${id}`)
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

// Clean posts list
export const cleanPosts = () => async (dispatch) => {
  dispatch({ type: CLEAN_POSTS })
}
