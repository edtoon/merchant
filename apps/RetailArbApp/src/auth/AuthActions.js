export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE'
export const LOGOUT = 'auth/LOGOUT'

export const requestLogin = (username, password) => {
  return {
    type: LOGIN_REQUEST,
    username,
    password,
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}
