import React from 'react'
import {
  Button,
  Text,
  View,
} from 'react-native'
import {
  NavigationActions,
} from 'react-navigation'

import LoginButton from './LoginButton'
import styles from '../styles'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Log In',
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Screen A
        </Text>
        <Text style={styles.instructions}>
          This is great
        </Text>
        <LoginButton />
      </View>
    )
  }
}