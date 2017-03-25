import * as AuthActions from './AuthActions'
import * as LoginOperation from './operations/LoginOperation'

const initialState = { jwt: null, authError: null }

export default (state = initialState, action) => {
  switch(action.type) {
    case AuthActions.SUCCEED:
      return LoginOperation.reduceSucceedLogin(state, action)
    case AuthActions.FAIL:
      return LoginOperation.reduceFailLogin(state, action)
    case AuthActions.LOGOUT:
      return { ...state, jwt: null, authError: null }
    default:
      return state
  }
}
