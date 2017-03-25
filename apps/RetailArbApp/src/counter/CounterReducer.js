import * as CounterActions from './CounterActions'

const initialState = { count: 0 }

export const CounterReducer = (state = initialState, action) => {
  switch (action.type) {
    case CounterActions.INCREMENT:
      return {...state, count: state.count + 1}
    case CounterActions.DECREMENT:
      return {...state, count: state.count - 1}
    default:
      return state
  }
}
