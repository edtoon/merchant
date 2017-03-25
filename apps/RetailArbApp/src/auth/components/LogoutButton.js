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

class LogoutButton extends React.Component {
  render() {
    return (
      <Button
        title="Log Out"
        onPress={this.props.logout}
      />
    )
  }
}

export default connect(null, dispatch => ({
  logout: () => dispatch(AuthActions.logout()),
}))(LogoutButton)
