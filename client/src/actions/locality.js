import axios from 'axios'
import { asyncActionStart, asyncActionFinish, asyncActionError } from './async'
import {
  GET_LOCALITIES,
  GET_LOCALITIES_ERROR,
  SET_CURRENT_LOCALITY,
  CLEAR_LOCALITIES,
} from './types'
import { setURLParams } from '../services/util'

// Get localities
export const getLocalities = (filters) => async (dispatch) => {
  const url = setURLParams({ ...filters })
  dispatch(asyncActionStart())
  try {
    const res = await axios.get(`/api/localities/?${url && url}`)
    dispatch({ type: GET_LOCALITIES, payload: res.data })
    dispatch(asyncActionFinish())
  } catch (error) {
    dispatch(asyncActionError())
    dispatch({
      type: GET_LOCALITIES_ERROR,
      payload: {
        message: error.message,
      },
    })
  }
}

// Set current locality
export const setCurrentLocality = (currentLocality) => async (dispatch) => {
  dispatch({ type: SET_CURRENT_LOCALITY, payload: currentLocality })
}

// Clear localities list
export const clearLocalities = () => async (dispatch) => {
  dispatch({ type: CLEAR_LOCALITIES })
}
