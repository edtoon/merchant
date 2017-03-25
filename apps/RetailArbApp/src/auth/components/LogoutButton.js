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

import * as AuthActions from '../AuthActions'

export const LogoutButton = connect(null, dispatch => ({
  logout: () => dispatch(AuthActions.logout()),
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
