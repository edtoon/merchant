// http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
// eslint-disable-next-line no-useless-escape
export const emailRegexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export function validateEmail (value) {
  return emailRegexp.test(value)
}

// http://regexlib.com/Search.aspx?k=password&AspxAutoDetectCookieSupport=1
export const passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/

export function validatePassword (value) {
  return passwordRegexp.test(value)
}
