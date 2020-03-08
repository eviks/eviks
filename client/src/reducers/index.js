import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import post from './post'
import { reducer as toastr } from 'react-redux-toastr'

export default combineReducers({
  alert,
  auth,
  post,
  toastr
})
