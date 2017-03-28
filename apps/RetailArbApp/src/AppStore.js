import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux'
import {
  autoRehydrate,
} from 'redux-persist'
import sagaMiddlewareFactory from 'redux-saga'

import { AppReducer } from './AppReducer'
import * as AuthProvider from './auth/AuthProvider'
import * as LocationProvider from './location/LocationProvider'

export function* rootSaga() {
  yield [
    ...[AuthProvider.sagas],
    ...[LocationProvider.sagas]
  ]
}

export const sagaMiddleware = sagaMiddlewareFactory()

export const AppStore = createStore(
  AppReducer, undefined, compose(
    autoRehydrate(), applyMiddleware(sagaMiddleware)
  )
)
