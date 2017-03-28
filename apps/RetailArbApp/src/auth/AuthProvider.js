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
      // TODO fix temporary token issues
      return { ...state, jwt: 'TODO: temporary token currently used', error: null }
    },
    [logoutComplete]: (state) => {
      return { ...state, jwt: null, error: null }
    },
  },
  initialState
)

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
  const {username, password} = action.payload

  try {
    const token = yield call(fetchAttemptLogin, username, password)
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
