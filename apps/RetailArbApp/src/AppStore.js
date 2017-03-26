import {
  AsyncStorage,
} from 'react-native'
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux'
import {
  autoRehydrate,
  persistStore,
} from 'redux-persist'
import sagaMiddlewareFactory from 'redux-saga'

import { AppReducer } from './AppReducer'
import { AuthSagas } from './auth/AuthSagas'
import { LocationSagas } from './location/LocationProvider'

function* rootSaga() {
  yield [
    ...AuthSagas,
    ...LocationSagas
  ]
}

const sagaMiddleware = sagaMiddlewareFactory()

export const AppStore = createStore(
  AppReducer, undefined, compose(
    autoRehydrate(), applyMiddleware(sagaMiddleware)
  )
)

persistStore(AppStore, {
  blacklist: ['nav'],
  storage: AsyncStorage,
})

sagaMiddleware.run(rootSaga)
