import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import auth from './auth'
import youtube from './youtube'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth,
  youtube,
})

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store
