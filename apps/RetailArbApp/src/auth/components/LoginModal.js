import React from 'react'
import {
  Button,
  Dimensions,
  Modal,
  StyleSheet,
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

import {
  validateEmail,
  validatePassword,
} from 'gg-common/utils/validators'

import * as AuthActions from '../AuthActions'
import { LoginModalStyles } from './LoginModalStyles'

export const LoginModal = connect(state => ({
  jwt: state.auth.jwt,
  errorMessage: state.auth.authError,
}), dispatch => ({
  attemptLogin: (username, password) => dispatch(AuthActions.attemptLogin(username, password)),
}))(
  class _LoginModal extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        username: null,
        password: null,
        errorMessage: null,
        disableActions: false,
      }
    }

    handleLogin = () => {
      const username = this.state.username
      const password = this.state.password

      if (username !== null && password !== null) {
        let newState = null

        if (!validateEmail(username)) {
          newState = { errorMessage: 'Login invalid.' }
        } else if (!validatePassword(password)) {
          newState =  { errorMessage: 'Password invalid.' }
        } else {
          newState = { disableActions: true }
        }

        if(newState !== null) {
          this.setState(newState)

          if (newState.disableActions) {
            this.props.attemptLogin(username, password)
          }
        }
      }
    }

    componentWillReceiveProps(newProps) {
      if (newProps.jwt !== null) {
        this.setState({
          username: null,
          password: null,
          errorMessage: null,
          disableActions: false,
        })
      } else if (newProps.errorMessage !== null) {
        this.setState({
          errorMessage: null,
          disableActions: false
        })
      }
    }

    handleDummy = () => {}

    render() {
      if (!this.state.disableActions && this.props.jwt !== null) {
        return null
      }

      const hasErrorFromApi = (this.props.errorMessage !== null)
      const errorMessage = (hasErrorFromApi ? this.props.errorMessage : this.state.errorMessage)

      return (
        <Modal
          transparent={true}
          onRequestClose={this.handleDummy}
        >
          <View style={LoginModalStyles.loginContainer}>

            <View style={LoginModalStyles.loginWrapper}>

              {errorMessage !== null &&
              <Text style={LoginModalStyles.loginErrorText}>{errorMessage}</Text>
              }

              <View style={LoginModalStyles.loginInputContainer}>
                <View style={LoginModalStyles.loginIconWrapper}>
                  <Icon name='user' style={LoginModalStyles.loginIcon} />
                </View>
                <TextInput
                  style={LoginModalStyles.loginInput}
                  value={this.state.username}
                  onChangeText={(text) => this.setState({ username: text })}
                  placeholder='Username'
                  keyboardType='email-address'
                />
              </View>

              <View style={LoginModalStyles.loginInputContainer}>
                <View style={LoginModalStyles.loginIconWrapper}>
                  <Icon name='lock' style={LoginModalStyles.loginIcon} />
                </View>
                <TextInput
                  style={LoginModalStyles.loginInput}
                  value={this.state.password}
                  onChangeText={(text) => this.setState({ password: text })}
                  placeholder='Password'
                  secureTextEntry
                />
              </View>

              <View style={LoginModalStyles.loginBottomContainer}>
                <TouchableOpacity onPress={this.handleDummy} disabled={this.state.disableActions}>
                  <Text style={LoginModalStyles.loginForgotText}>Forgot Password?</Text>
                </TouchableOpacity>
                <View style={LoginModalStyles.loginButtonContainer}>
                  <Button title='Login' onPress={this.handleLogin} disabled={this.state.disableActions} />
                </View>
              </View>

            </View>

          </View>
        </Modal>
      )
    }
  }
)
