import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import auth from './auth'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth,
})

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store
