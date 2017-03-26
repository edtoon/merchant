import {
  combineReducers,
} from 'redux'

import { AppNavReducer } from './AppNavReducer'
import { AuthReducer } from './auth/AuthReducer'
import { LocationReducer } from './location/LocationProvider'

export const AppReducer = combineReducers({
  auth: AuthReducer,
  nav: AppNavReducer,
  location: LocationReducer,
})
