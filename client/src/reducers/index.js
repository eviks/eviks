import { combineReducers } from 'redux'
import async from './async'
import alert from './alert'
import auth from './auth'
import user from './user'
import post from './post'
import locality from './locality'
import 'moment/locale/ru'
import 'moment/locale/az'
import { reducer as toastr } from 'react-redux-toastr'

export default combineReducers({
  async,
  alert,
  auth,
  user,
  post,
  locality,
  toastr
})
