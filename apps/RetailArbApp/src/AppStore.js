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

function* rootSaga() {
  yield [
    ...AuthSagas
  ]
}

const sagaMiddleware = sagaMiddlewareFactory()

export const AppStore = createStore(
  AppReducer, undefined, compose(
    applyMiddleware(sagaMiddleware), autoRehydrate()
  )
)

sagaMiddleware.run(rootSaga)
