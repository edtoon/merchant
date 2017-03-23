import React from 'react'
import {
  Button,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  NavigationActions,
} from 'react-navigation'
import {
  connect,
} from 'react-redux'

import styles from '../styles'

class LoginModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null,
      password: null,
      errorMessage: null,
    }
    this.logInput = this.logInput.bind(this)
  }

  logInput() {
    const match = (this.state.username === this.state.password)
    console.log('Username: ' + this.state.username + ', Password: ' + this.state.password + ', Match: ' + match)

    if (match) {
      this.setState({ errorMessage: null })
    } else {
      this.setState({ errorMessage: 'username & password do not match' })
    }
  }

  render() {
    if (this.props.jwt !== null) {
      return null;
    }

    return (
      <Modal
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={styles.loginContainer}>

          <View style={styles.loginWrapper}>

            {this.state.errorMessage !== null &&
                <Text style={styles.loginErrorText}>{this.state.errorMessage}</Text>
            }

            <View style={styles.loginInputContainer}>
              <View style={styles.loginIconWrapper}>
                <Icon name='user' style={styles.loginIcon} />
              </View>
              <TextInput
                style={styles.loginInput}
                value={this.state.username}
                onChangeText={(text) => this.setState({ username: text })}
                placeholder='Username'
                keyboardType='email-address'
              />
            </View>

            <View style={styles.loginInputContainer}>
              <View style={styles.loginIconWrapper}>
                <Icon name='lock' style={styles.loginIcon} />
              </View>
              <TextInput
                style={styles.loginInput}
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })}
                placeholder='Password'
                secureTextEntry
              />
            </View>

            <View style={styles.loginBottomContainer}>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.loginForgotText}>Forgot Password?</Text>
              </TouchableOpacity>
              <View style={styles.loginButtonContainer}>
                <Button title='Login' onPress={this.logInput} />
              </View>
            </View>

          </View>

        </View>
      </Modal>
    )
  }
}

export default connect(state => ({
  jwt: state.login.jwt,
}), dispatch => ({
  toProfile: () => dispatch(NavigationActions.navigate({ routeName: 'Profile' })),
}))(LoginModal)
