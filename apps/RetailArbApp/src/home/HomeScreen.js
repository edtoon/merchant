import React from 'react'
import {
  View,
} from 'react-native'

import LoginModal from '../login/LoginModal'
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
        <LoginModal />
        <AuthButton />
        <CounterMessage />
        <IncrementButton />
        <DecrementButton />
      </View>
    )
  }
}
