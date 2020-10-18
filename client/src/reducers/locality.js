import initialState from './initialStates/localityInitialState'
import {
  GET_LOCALITIES,
  GET_LOCALITIES_ERROR,
  SET_CURRENT_LOCALITY,
  CLEAR_LOCALITIES
} from '../actions/types'

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_LOCALITIES:
      return { ...state, localities: payload }
    case GET_LOCALITIES_ERROR:
      return { ...state, error: payload }
    case SET_CURRENT_LOCALITY:
      localStorage.setItem('currentLocality', JSON.stringify(payload))
      return { ...state, currentLocality: payload }
    case CLEAR_LOCALITIES:
      return { ...state, localities: initialState.localities }
    default:
      return state
  }
}
