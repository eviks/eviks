import { combineReducers } from 'redux'
import async from './async'
import alert from './alert'
import auth from './auth'
import post from './post'
import region from './region'
import 'moment/locale/ru'
import 'moment/locale/az'
import { reducer as toastr } from 'react-redux-toastr'

export default combineReducers({
  async,
  alert,
  auth,
  post,
  region,
  toastr
})
