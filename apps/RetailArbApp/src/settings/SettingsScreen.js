import React from 'react'
import {
  Text,
  View,
} from 'react-native'

import { AppStyles } from '../AppStyles'
import { LogoutButton } from '../auth/components/LogoutButton'

export class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <LogoutButton />
      </View>
    )
  }
}
