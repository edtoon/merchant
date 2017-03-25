import React from 'react'
import {
  Text,
  View,
} from 'react-native'

import { AppStyles } from '../AppStyles'

export class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <Text style={AppStyles.welcome}>
          Profile Screen
        </Text>
      </View>
    )
  }
}
