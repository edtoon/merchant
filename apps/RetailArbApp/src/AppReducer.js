import {
  combineReducers,
} from 'redux'

import AuthReducer from './auth/AuthReducer'
import CounterReducer from './counter/CounterReducer'
import NavReducer from './nav/NavReducer'

const AppReducer = combineReducers({
  nav: NavReducer,
  auth: AuthReducer,
  counter: CounterReducer,
})

export default AppReducer
