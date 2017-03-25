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

import * as AuthActions from './AuthActions'

class AuthButton extends React.Component {
  render() {
    return (
      <Button
        title={this.props.isLoggedIn ? 'Log Out' : 'Log In'}
        onPress={this.props.isLoggedIn ? this.props.logout : this.props.login}
      />
    )
  }
}

export default connect(state => ({
  isLoggedIn: state.auth.isLoggedIn,
}), dispatch => ({
  logout: () => dispatch({ type: AuthActions.LOGOUT }),
  login: () => dispatch(NavigationActions.navigate({ routeName: 'Login' })),
}))(AuthButton)
