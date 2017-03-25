export const INCREMENT = 'counter/INCREMENT'
export const DECREMENT = 'counter/DECREMENT'

export const increment = () => {
  return {
    type: INCREMENT
  }
}

export const decrement = () => {
  return {
    type: DECREMENT
  }
}
