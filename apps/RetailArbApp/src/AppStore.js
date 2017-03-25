import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux'
import {
  autoRehydrate,
} from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

import AuthSagas from './auth/AuthSagas'
import AppReducer from './AppReducer'

function* rootSaga() {
  yield [
    ...AuthSagas
  ]
}

const sagaMiddleware = createSagaMiddleware()

export default createStore(
  AppReducer, undefined, compose(
    applyMiddleware(sagaMiddleware), autoRehydrate()
  )
)

sagaMiddleware.run(rootSaga)
