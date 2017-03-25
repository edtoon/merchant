import React from 'react'
import {
  View,
} from 'react-native'

import { AppStyles } from '../AppStyles'
import { LoginModal } from '../auth/components/LoginModal'
import { IconBar } from '../layout/IconBar'

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <LoginModal />
        <IconBar />
      </View>
    )
  }
}
