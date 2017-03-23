import {
  combineReducers,
} from 'redux'

import AuthReducer from './auth/AuthReducer'
import CounterReducer from './counter/CounterReducer'
import LoginReducer from './login/LoginReducer'
import NavReducer from './nav/NavReducer'

const AppReducer = combineReducers({
  auth: AuthReducer,
  counter: CounterReducer,
  login: LoginReducer,
  nav: NavReducer,
})

export default AppReducer
