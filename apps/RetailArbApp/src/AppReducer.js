import {
  combineReducers,
} from 'redux'

import { AppNavReducer } from './AppNavReducer'
import { AuthReducer } from './auth/AuthReducer'

export const AppReducer = combineReducers({
  auth: AuthReducer,
  nav: AppNavReducer,
})
