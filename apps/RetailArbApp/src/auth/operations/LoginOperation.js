import {
  NavigationActions,
} from 'react-navigation'
import {
  call,
  put
} from 'redux-saga/effects';

import * as AuthActions from '../AuthActions'

const fetchAttemptLogin = async (username, password) => {
  return fetch('https://api.merchant.gg/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then(response => {
      if (!response.ok) {
        let error = new Error(response.statusText)
        error.response = response
        throw error
      } else {
        return response.json()
      }
    })
    .then(json => json.token)
}

export function* sagaAttemptLogin(action) {
  try {
    const token = yield call(fetchAttemptLogin, action.username, action.password)
    yield put(AuthActions.succeedLogin(token))
  } catch(e) {
    console.log('Failed login', e)
    yield put(AuthActions.failLogin((e.response && e.response._bodyText) ? e.response._bodyText : e.message))
  }
}

export const reduceSucceedLogin = (state, action) => {
  return { ...state, jwt: 'TODO: temporary token currently used', authError: null }
}

export const reduceFailLogin = (state, action) => {
  return { ...state, jwt: null, authError: (action.message || 'Unknown error') }
}

export function* sagaLogout(action) {
  yield put(NavigationActions.back())
  yield put(AuthActions.logoutComplete())
}

export const reduceLogoutComplete = (state, action) => {
  return { ...state, jwt: null, authError: null }
}
