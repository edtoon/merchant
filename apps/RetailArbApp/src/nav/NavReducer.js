import {
  NavigationActions,
} from 'react-navigation'

import AppNavigator from '../AppNavigator'
import * as AuthActions from '../auth/AuthActions'

const initialNavState = {
  index: 1,
  routes: [
    { key: 'InitA', routeName: 'Home' },
    { key: 'InitB', routeName: 'Login' },
  ],
}

export default (state = initialNavState, action) => {
  if (action.type === AuthActions.LOGIN) {
    return AppNavigator.router.getStateForAction(NavigationActions.back(), state)
  }

  if (action.type === AuthActions.LOGOUT) {
    return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Login' }), state)
  }

  return AppNavigator.router.getStateForAction(action, state)
}
