import React from 'react'
import {
  Button,
  Text,
  View
} from 'react-native'
import {
  NavigationActions,
} from 'react-navigation'
import {
  connect,
} from 'react-redux'

import styles from '../styles'

class LoginStatusMessage extends React.Component {
  render() {
    if (!this.props.isLoggedIn) {
      return <Text>Please log in</Text>
    }

    return (
      <View>
        <Text style={styles.welcome}>
          You are {this.props.isLoggedIn ? 'currently' : 'not'} logged in.
        </Text>
        <Button
          onPress={this.props.toProfile}
          title="Profile"
        />
      </View>
    )
  }
}

export default connect(state => ({
  isLoggedIn: state.auth.isLoggedIn,
}), dispatch => ({
  toProfile: () => dispatch(NavigationActions.navigate({ routeName: 'Profile' }))
}))(LoginStatusMessage)
