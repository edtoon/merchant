import {
  StackNavigator,
} from 'react-navigation'
import {
  connect,
} from 'react-redux'

import { HomeScreen } from './home/HomeScreen'
import { SettingsScreen } from './settings/SettingsScreen'

export const AppNavigator = connect(state => ({
  nav: state.nav,})
)(
  StackNavigator({
    Home: { screen: HomeScreen },
    Settings: { screen: SettingsScreen },
  })
)
