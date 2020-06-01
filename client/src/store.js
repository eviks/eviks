import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import formValidationMiddleware from './middleware/formValidationMiddleware'
import validateAttributeUpdateMiddleware from './middleware/validateAttributeUpdateMiddleware'
import addPostMiddleware from './middleware/addPostMiddleware'
import rootReducer from './reducers'

const initialState = {}

const middleware = [
  thunk,
  formValidationMiddleware,
  validateAttributeUpdateMiddleware,
  addPostMiddleware
]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
