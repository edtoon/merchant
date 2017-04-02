import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux'
import {
  createLogger
} from 'redux-logger'
import {
  autoRehydrate,
} from 'redux-persist'
import sagaMiddlewareFactory from 'redux-saga'

import { AppReducer } from './AppReducer'
import * as AuthProvider from './auth/AuthProvider'
import * as DeviceIntegrationProvider from './device/DeviceIntegrationProvider'

export function* rootSaga() {
  yield [
    ...AuthProvider.sagas,
    ...DeviceIntegrationProvider.sagas
  ]
}

export const sagaMiddleware = sagaMiddlewareFactory()

export const AppStore = createStore(
  AppReducer, undefined, compose(
    autoRehydrate(), applyMiddleware(sagaMiddleware, createLogger())
  )
)
