import React from 'react'
import {
  Text,
  View,
} from 'react-native'

import { AppStyles } from '../AppStyles'
import { LogoutButton } from '../auth/components/LogoutButton'
import { CopyrightLine } from '../layout/CopyrightLine'

export class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  }

  render() {
    return (
      <View style={AppStyles.centeredContainer}>
        <LogoutButton />
        <CopyrightLine />
      </View>
    )
  }
}
