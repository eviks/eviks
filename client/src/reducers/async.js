import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR,
} from '../actions/types'

const initialState = { loading: false, loadingElements: [] }

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case ASYNC_ACTION_START:
      return {
        ...state,
        loading: true,
        loadingElements: [...state.loadingElements, payload],
      }
    case ASYNC_ACTION_FINISH: {
      const filtered = state.loadingElements.filter(
        (element) => element !== payload
      )
      return {
        ...state,
        loading: filtered.length > 0,
        loadingElements: filtered,
      }
    }
    case ASYNC_ACTION_ERROR: {
      const filtered = state.loadingElements.filter(
        (element) => element !== payload
      )
      return {
        ...state,
        loading: filtered.length > 0,
        loadingElements: filtered,
      }
    }
    default:
      return state
  }
}
