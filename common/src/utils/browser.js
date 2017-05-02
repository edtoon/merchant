export const getCookie = (name) => {
  if (typeof document !== 'undefined') {
    const nameWithEquals = name + '='
    const decodedCookie = decodeURIComponent(document.cookie)
    const decodedCookieParts = decodedCookie.split(';')

    for (let i = 0; i < decodedCookieParts.length; i++) {
      let c = decodedCookieParts[i]

      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }

      if (c.indexOf(nameWithEquals) === 0) {
        return c.substring(nameWithEquals.length, c.length)
      }
    }
  }

  return ''
}
