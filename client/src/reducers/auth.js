import { VERIFICATION_SUCCESS, VERIFICATION_FAIL } from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case VERIFICATION_SUCCESS:
      localStorage.setItem('token', payload.token)
      return { ...state, ...payload, isAuthenticated: true, loading: false }
    case VERIFICATION_FAIL:
      localStorage.removeItem('token')
      return { ...state, token: null, isAuthenticated: false, loading: false }
    default:
      return state
  }
}
