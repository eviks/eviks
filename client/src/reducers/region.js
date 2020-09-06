import initialState from './initialStates/regionInitialState'
import {
  GET_REGIONS,
  GET_REGIONS_ERROR,
  SET_CURRENT_REGION,
  CLEAR_REGIONS
} from '../actions/types'

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_REGIONS:
      return { ...state, regions: payload }
    case GET_REGIONS_ERROR:
      return { ...state, error: payload }
    case SET_CURRENT_REGION:
      localStorage.setItem('currentRegion', JSON.stringify(payload))
      return { ...state, currentRegion: payload }
    case CLEAR_REGIONS:
      return { ...state, regions: initialState.regions }
    default:
      return state
  }
}
