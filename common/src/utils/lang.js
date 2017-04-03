export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
export const unixTimestamp = () => ((Date.now() / 1000) | 0)
export const valueUnlessUndef = (value, undefValue = null) => (value === undefined ? undefValue : value)
export const valueOrDefault = (value, defaultValue = null) => ((value === undefined || value === null) ? defaultValue : value)
