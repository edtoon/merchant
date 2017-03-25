import AppNavigator from './AppNavigator'

const initialState = {
  index: 0,
  routes: [
    { key: 'Init', routeName: 'Home' },
  ],
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return AppNavigator.router.getStateForAction(action, state)
  }
}
