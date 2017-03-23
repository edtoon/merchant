import React from 'react'
import {
  Button,
  Text,
  View,
} from 'react-native'
import {
  NavigationActions,
} from 'react-navigation'

import LoginStatusMessage from './LoginStatusMessage'
import AuthButton from './AuthButton'
import IncrementButton from './IncrementButton'
import DecrementButton from './DecrementButton'
import CounterMessage from './CounterMessage'
import styles from '../styles'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home Screen',
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginStatusMessage />
        <AuthButton />
        <CounterMessage />
        <IncrementButton />
        <DecrementButton />
      </View>
    )
  }
}
