import * as AuthActions from './AuthActions'

const initialAuthState = { isLoggedIn: false }

export default (state = initialAuthState, action) => {
  if (action.type === AuthActions.LOGIN) {
    return { ...state, isLoggedIn: true }
  }

  if (action.type === AuthActions.LOGOUT) {
    return { ...state, isLoggedIn: false }
  }

  return state
}
