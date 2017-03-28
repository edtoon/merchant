import React from 'react'
import {
  Button,
} from 'react-native'
import {
  NavigationActions,
} from 'react-navigation'
import {
  connect,
} from 'react-redux'

import * as AuthProvider from '../AuthProvider'

@connect(
  state => ({}),
  dispatch => ({
    logout: () => dispatch(AuthProvider.logout()),
  })
)
export class LogoutButton extends React.Component {
  render() {
    return (
      <Button
        title="Log Out"
        onPress={this.props.logout}
      />
    )
  }
}
