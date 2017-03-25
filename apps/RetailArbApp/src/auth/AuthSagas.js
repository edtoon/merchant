import { takeLatest } from 'redux-saga/effects';

import * as LoginOperation from './operations/LoginOperation'
import * as AuthActions from './AuthActions'

export default [
  takeLatest(AuthActions.ATTEMPT, LoginOperation.sagaAttemptLogin)
]
