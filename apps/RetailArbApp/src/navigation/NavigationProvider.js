import {
  StackNavigator,
} from 'react-navigation'
import {
  connect,
} from 'react-redux'

import { AlertsScreen } from '../alerts/AlertsScreen'
import { CaptureScreen } from '../capture/CaptureScreen'
import { HomeScreen } from '../home/HomeScreen'
import { SettingsScreen } from '../settings/SettingsScreen'

const navigation = connect(
  state => ({
    nav: state.nav,
  })
)(
  StackNavigator({
    Alerts: { screen: AlertsScreen },
    Capture: { screen: CaptureScreen },
    Home: { screen: HomeScreen },
    Settings: { screen: SettingsScreen },
  })
)

const initialState = {
  index: 0,
  routes: [
    { key: 'Init', routeName: 'Home' },
  ],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return navigation.router.getStateForAction(action, state)
  }
}

export default navigation
