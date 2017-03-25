import { takeLatest } from 'redux-saga/effects';

import * as LoginOperation from './operations/LoginOperation'
import * as AuthActions from './AuthActions'

export const AuthSagas = [
  takeLatest(AuthActions.ATTEMPT, LoginOperation.sagaAttemptLogin)
]
