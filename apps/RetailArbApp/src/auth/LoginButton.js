import React from 'react'
import {
  Button,
} from 'react-native'
import {
  connect,
} from 'react-redux'

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
  login: () => dispatch({ type: 'Login' }),
}))(LoginButton)
