import {
  StackNavigator,
} from 'react-navigation'
import {
  connect,
} from 'react-redux'

import { HomeScreen } from './home/HomeScreen'
import { ProfileScreen } from './profile/ProfileScreen'

export const AppNavigator = connect(state => ({
  nav: state.nav,})
)(
  StackNavigator({
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
  })
)
