import {
  NavigationActions,
} from 'react-navigation'
import {
  createAction,
  createReducer,
} from 'redux-act'
import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import { API_URL, USER_AGENT } from '../utils'

export const attemptLogin = createAction('auth/attemptLogin', (username, password) => ({username, password}))
export const failLogin = createAction('auth/failLogin', (message) => ({message}))
export const succeedLogin = createAction('auth/succeedLogin', (token) => ({token}))
export const logout = createAction('auth/logout')
export const logoutComplete = createAction('auth/logoutComplete')

const initialState = { jwt: null, error: null }

export const reducer = createReducer(
  {
    [failLogin]: (state, {message}) => {
      return { ...state, jwt: null, error: (message || 'Unknown error') }
    },
    [succeedLogin]: (state, {token}) => {
      return { ...state, jwt: token, error: null }
    },
    [logoutComplete]: (state) => {
      return { ...state, jwt: null, error: null }
    },
  },
  initialState
)

const fetchAttemptLogin = async (username, password) => {
  return fetch(API_URL + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': USER_AGENT
    },
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

const fetchClaimLogin = async (token) => {
  return fetch(API_URL + '/claim', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'User-Agent': USER_AGENT
    },
  })
    .then(response => {
      if (!response.ok) {
        let error = new Error(response.statusText)
        error.response = response
        throw error
      }
    })
}

export function* sagaAttemptLogin(action) {
  const {username, password} = action.payload

  try {
    const token = yield call(fetchAttemptLogin, username, password)
    yield call(fetchClaimLogin, token)
    yield put(succeedLogin(token))
  } catch(e) {
    console.log('Failed login', e)
    yield put(failLogin((e.response && e.response._bodyText) ? e.response._bodyText : e.message))
  }
}

export function* sagaLogout() {
  yield put(NavigationActions.back())
  yield put(logoutComplete())
}

export const sagas = [
  takeLatest([attemptLogin], sagaAttemptLogin),
  takeLatest([logout], sagaLogout)
]
