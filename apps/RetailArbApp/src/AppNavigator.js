import {
  StackNavigator,
} from 'react-navigation'
import {
  connect,
} from 'react-redux'

import { AlertsScreen } from './alerts/AlertsScreen'
import { HomeScreen } from './home/HomeScreen'
import { SettingsScreen } from './settings/SettingsScreen'

export const AppNavigator = connect(state => ({
  nav: state.nav,})
)(
  StackNavigator({
    Alerts: { screen: AlertsScreen },
    Home: { screen: HomeScreen },
    Settings: { screen: SettingsScreen },
  })
)
