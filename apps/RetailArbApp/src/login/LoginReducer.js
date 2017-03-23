import * as AuthActions from '../auth/AuthActions'

const initialLoginState = { jwt: null }

export default (state = initialLoginState, action) => {
  if (action.type === AuthActions.LOGOUT) {
    return { ...state, jwt: null }
  }

  return state
}
