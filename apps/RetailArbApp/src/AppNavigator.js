import {
  StackNavigator,
} from 'react-navigation'
import {
  connect,
} from 'react-redux'

import LoginScreen from './auth/LoginScreen'
import HomeScreen from './home/HomeScreen'
import ProfileScreen from './profile/ProfileScreen'

const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
})

export default connect(state => ({
  nav: state.nav,})
)(AppNavigator)
