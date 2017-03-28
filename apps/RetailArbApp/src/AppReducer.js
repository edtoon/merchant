import {
  combineReducers,
} from 'redux'

import * as NavigationProvider from './navigation/NavigationProvider'
import * as AuthProvider from './auth/AuthProvider'
import * as LocationProvider from './location/LocationProvider'

export const AppReducer = combineReducers({
  auth: AuthProvider.reducer,
  nav: NavigationProvider.reducer,
  location: LocationProvider.reducer,
})
