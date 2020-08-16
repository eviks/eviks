import axios from 'axios'
import { asyncActionStart, asyncActionFinish, asyncActionError } from './async'
import { GET_REGIONS, GET_REGIONS_ERROR, CLEAR_REGIONS } from './types'
import { setURLParams } from '../utils/urlParams'

// Get regions
export const getRegions = filters => async dispatch => {
  const url = setURLParams({ ...filters })
  dispatch(asyncActionStart())
  try {
    const res = await axios.get(`api/regions/?${url && url}`)
    dispatch({ type: GET_REGIONS, payload: res.data })
    dispatch(asyncActionFinish())
  } catch (error) {
    dispatch(asyncActionError())
    dispatch({
      type: GET_REGIONS_ERROR,
      payload: {
        message: error.message
      }
    })
  }
}

// Clear regions list
export const clearRegions = () => async dispatch => {
  dispatch({ type: CLEAR_REGIONS })
}
