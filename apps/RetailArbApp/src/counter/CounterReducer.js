const initialCounterState = { count: 0 }

export default (state = initialCounterState, action) => {
  if (action.type === 'Increment') {
    return { ...state, count: state.count + 1 }
  }

  if (action.type === 'Decrement') {
    return { ...state, count: state.count - 1 }
  }

  return state
}
