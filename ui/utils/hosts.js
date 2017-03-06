export const currentHost = ((process && process.env && process.env.HOST) ? process.env.HOST : window.location.hostname)

export function wwwHost () {
  return 'www' + currentHost.substr(currentHost.indexOf('.'))
}

export function loginHost () {
  return 'login' + currentHost.substr(currentHost.indexOf('.'))
}

export function apiHost () {
  return 'api' + currentHost.substr(currentHost.indexOf('.'))
}

export function uiHost () {
  return 'app' + currentHost.substr(currentHost.indexOf('.'))
}
