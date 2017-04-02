import {
  combineReducers,
} from 'redux'

import * as NavigationProvider from './navigation/NavigationProvider'
import * as AuthProvider from './auth/AuthProvider'
import * as DeviceIntegrationProvider from './device/DeviceIntegrationProvider'

export const AppReducer = combineReducers({
  auth: AuthProvider.reducer,
  nav: NavigationProvider.reducer,
  location: DeviceIntegrationProvider.reducer,
})
