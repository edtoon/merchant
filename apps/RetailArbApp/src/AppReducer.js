import {
  combineReducers,
} from 'redux'

import CounterReducer from './counter/CounterReducer'
import AuthReducer from './auth/AuthReducer'
import AppNavReducer from './AppNavReducer'

export default combineReducers({
  auth: AuthReducer,
  counter: CounterReducer,
  nav: AppNavReducer,
})
