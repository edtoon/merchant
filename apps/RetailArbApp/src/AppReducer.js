import {
  combineReducers,
} from 'redux'

import { AppNavReducer } from './AppNavReducer'
import { AuthReducer } from './auth/AuthReducer'
import { CounterReducer } from './counter/CounterReducer'

export const AppReducer = combineReducers({
  auth: AuthReducer,
  counter: CounterReducer,
  nav: AppNavReducer,
})
