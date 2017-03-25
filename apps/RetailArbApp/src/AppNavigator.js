import {
  StackNavigator,
} from 'react-navigation'
import {
  connect,
} from 'react-redux'

import HomeScreen from './home/HomeScreen'
import ProfileScreen from './profile/ProfileScreen'

const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
})

export default connect(state => ({
  nav: state.nav,})
)(AppNavigator)
