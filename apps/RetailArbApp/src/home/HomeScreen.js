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

import { AppStyles } from '../AppStyles'
import { CounterMessage } from '../counter/components/CounterMessage'
import { DecrementButton } from '../counter/components/DecrementButton'
import { IncrementButton } from '../counter/components/IncrementButton'
import { LoginModal } from '../auth/components/LoginModal'
import { LogoutButton } from '../auth/components/LogoutButton'

export const HomeScreen = connect(state => ({}), dispatch => ({
  profile: () => dispatch(NavigationActions.navigate({ routeName: 'Profile' }))
}))(
  class _HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Home Screen',
    }

    render() {
      return (
        <View style={AppStyles.container}>
          <LoginModal />
          <Button title="Profile" onPress={this.props.profile} />
          <LogoutButton />
          <CounterMessage />
          <IncrementButton />
          <DecrementButton />
        </View>
      )
    }
  }
)
