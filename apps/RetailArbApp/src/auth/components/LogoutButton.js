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

export const LogoutButton = connect(null, dispatch => ({
  logout: () => dispatch(AuthProvider.logout()),
}))(
  class _LogoutButton extends React.Component {
    render() {
      return (
        <Button
          title="Log Out"
          onPress={this.props.logout}
        />
      )
    }
  }
)
