import React from 'react'
import {
  Button,
  View,
} from 'react-native'
import {
  NavigationActions,
} from 'react-navigation'
import {
  connect,
} from 'react-redux'

import LoginModal from '../login/LoginModal'
import AuthButton from '../auth/AuthButton'
import IncrementButton from '../counter/IncrementButton'
import DecrementButton from '../counter/DecrementButton'
import CounterMessage from '../counter/CounterMessage'
import styles from '../styles'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home Screen',
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginModal />
        <Button title="Profile" onPress={this.props.profile} />
        <AuthButton />
        <CounterMessage />
        <IncrementButton />
        <DecrementButton />
      </View>
    )
  }
}

export default connect(state => ({}), dispatch => ({
  profile: () => dispatch(NavigationActions.navigate({ routeName: 'Profile' }))
}))(HomeScreen)
