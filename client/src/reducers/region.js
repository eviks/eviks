import initialState from './initialStates/regionInitialState'
import { GET_REGIONS, GET_REGIONS_ERROR, CLEAR_REGIONS } from '../actions/types'

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_REGIONS:
      return { ...state, regions: payload }
    case GET_REGIONS_ERROR:
      return { ...state, error: payload }
    case CLEAR_REGIONS:
      return initialState
    default:
      return state
  }
}
