const initialAuthState = { isLoggedIn: false }

export default (state = initialAuthState, action) => {
  if (action.type === 'Login') {
    return { ...state, isLoggedIn: true }
  }

  if (action.type === 'Logout') {
    return { ...state, isLoggedIn: false }
  }

  return state
}
