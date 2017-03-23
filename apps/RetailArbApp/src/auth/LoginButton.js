import React from 'react'
import {
  Button,
} from 'react-native'
import {
  connect,
} from 'react-redux'

import * as AuthActions from './AuthActions'

class LoginButton extends React.Component {
  render() {
    return (
      <Button
        title='Login'
        onPress={this.props.login}
      />
    )
  }
}

export default connect(state => ({
  count: state.counter.count,
}), dispatch => ({
  login: () => dispatch({ type: AuthActions.LOGIN }),
}))(LoginButton)
