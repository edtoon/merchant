import {
  NavigationActions,
} from 'react-navigation'

import AppNavigator from '../AppNavigator'

const initialNavState = {
  index: 1,
  routes: [
    { key: 'InitA', routeName: 'Home' },
    { key: 'InitB', routeName: 'Login' },
  ],
}

export default (state = initialNavState, action) => {
  if (action.type === 'Login') {
    return AppNavigator.router.getStateForAction(NavigationActions.back(), state)
  }

  if (action.type === 'Logout') {
    return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Login' }), state)
  }

  return AppNavigator.router.getStateForAction(action, state)
}
