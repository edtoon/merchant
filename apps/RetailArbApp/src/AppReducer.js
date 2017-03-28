import {
  combineReducers,
} from 'redux'

import { AppNavReducer } from './AppNavReducer'
import * as AuthProvider from './auth/AuthProvider'
import * as LocationProvider from './location/LocationProvider'

export const AppReducer = combineReducers({
  auth: AuthProvider.reducer,
  nav: AppNavReducer,
  location: LocationProvider.reducer,
})
