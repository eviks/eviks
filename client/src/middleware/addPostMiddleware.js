import { ADD_POST, POST_ERROR } from '../actions/types'
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../actions/async'
import axios from 'axios'

const addPostMiddleware = ({ dispatch, getState }) => next => async action => {
  if (action.type !== 'ADD_POST_API') {
    return next(action)
  }

  dispatch(asyncActionStart())
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // Request for city ID.
    const cityRequest = await axios.get(
      `/api/regions/?type=2&name=${action.payload.city}`
    )

    const city = cityRequest.data[0]

    const post = {
      ...action.payload,
      city: { id: city.id, name: city.name }
    }

    // District ID
    if (post.district) {
      post.district = city.children.filter(
        child => child.name === post.district
      )[0]
    }

    // Request for subdistrict ID
    if (post.subdistrict) {
      const districtRequest = await axios.get(
        `/api/regions/?id=${post.district.id}`
      )

      const district = districtRequest.data[0]

      post.subdistrict = district.children.filter(
        child => child.name === post.subdistrict
      )[0]
    }

    // Add post
    const res = await axios.post('/api/posts', post, config)
    action.result = true
    dispatch({ type: ADD_POST, payload: res.data })
    dispatch(asyncActionFinish())
    next(action)
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

export default addPostMiddleware
