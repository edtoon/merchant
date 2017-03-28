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
import { AuthSagas } from './auth/AuthSagas'
import { LocationSagas } from './location/LocationProvider'

export function* rootSaga() {
  yield [
    ...AuthSagas,
    ...LocationSagas
  ]
}

export const sagaMiddleware = sagaMiddlewareFactory()

export const AppStore = createStore(
  AppReducer, undefined, compose(
    autoRehydrate(), applyMiddleware(sagaMiddleware)
  )
)
