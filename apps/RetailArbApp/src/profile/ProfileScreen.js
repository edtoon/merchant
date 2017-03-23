import React from 'react'
import {
  Text,
  View,
} from 'react-native'

import styles from '../styles'

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Profile Screen
        </Text>
      </View>
    )
  }
}
