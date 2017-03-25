export const ATTEMPT = 'auth/ATTEMPT'
export const SUCCEED = 'auth/SUCCEED'
export const FAIL = 'auth/FAIL'
export const LOGOUT = 'auth/LOGOUT'

export const attemptLogin = (username, password) => {
  return {
    type: ATTEMPT,
    username,
    password,
  }
}

export const succeedLogin = (token) => {
  return {
    type: SUCCEED,
    token
  }
}

export const failLogin = (message) => {
  return {
    type: FAIL,
    message
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}
