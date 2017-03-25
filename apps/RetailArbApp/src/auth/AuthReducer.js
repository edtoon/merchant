import * as AuthActions from './AuthActions'

const initialState = { jwt: null, authError: null }

export default (state = initialState, action) => {
  switch(action.type) {
    case AuthActions.LOGOUT:
      return { ...state, jwt: null }
    case AuthActions.LOGIN_REQUEST:
      if (action.username && action.password && action.username === 'ed@gg.co') {
        return { ...state, jwt: 'foo' }
      } else {
        return { ...state, authError: 'Invalid credentials' }
      }
    default:
      return state
  }
}
