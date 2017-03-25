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
import { validateEmail, validatePassword } from 'gg-common/utils/validators'

import * as AuthActions from '../AuthActions'

class LoginModal extends React.Component {
  static ERROR_SOURCE_LOCAL = 1
  static ERROR_SOURCE_API = 2

  constructor(props) {
    super(props)

    this.state = {
      username: null,
      password: null,
      errorMessage: null,
      errorSource: LoginModal.ERROR_SOURCE_LOCAL,
    }
  }

  handleLogin = () => {
    const username = this.state.username
    const password = this.state.password

    if (username !== null && password !== null) {
      let errorMessage = null
      let errorSource = LoginModal.ERROR_SOURCE_LOCAL

      if (!validateEmail(username)) {
        errorMessage = 'Login invalid.'
      } else if (!validatePassword(password)) {
        errorMessage = 'Password invalid.'
      } else {
        errorSource = LoginModal.ERROR_SOURCE_API
      }

      this.setState({ username, password, errorMessage, errorSource })

      if (errorSource === LoginModal.ERROR_SOURCE_API) {
        this.props.attemptLogin(username, password)
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.jwt === null && newProps.jwt !== null) {
        this.setState({ username: null, password: null, errorSource: LoginModal.ERROR_SOURCE_LOCAL })
    }
  }

  handleDummy = () => {}

  render() {
    if (this.props.jwt !== null) {
      return null
    }

    const useApiError = (this.state.errorSource === LoginModal.ERROR_SOURCE_API)
    const errorMessage = (useApiError ? this.props.errorMessage : this.state.errorMessage)
    const disableActionsPendingResponse = (useApiError && this.props.errorMessage === null)

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
              <TouchableOpacity onPress={this.handleDummy} disabled={disableActionsPendingResponse}>
                <Text style={LoginModalStyles.loginForgotText}>Forgot Password?</Text>
              </TouchableOpacity>
              <View style={LoginModalStyles.loginButtonContainer}>
                <Button title='Login' onPress={this.handleLogin} disabled={disableActionsPendingResponse} />
              </View>
            </View>

          </View>

        </View>
      </Modal>
    )
  }
}

const [screenWidth, screenHeight] = [Dimensions.get('window').width, Dimensions.get('window').height]
const [dialogWidth, dialogHeight] = [Math.min(screenWidth, 300), Math.min(screenHeight / 3, 175)]
const LoginModalStyles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  loginWrapper: {
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 20,
    width: dialogWidth,
    height: dialogHeight,
    backgroundColor: '#b37',
    borderWidth: 5,
    borderColor: '#a15',
  },
  loginInputContainer: {
    flexDirection: 'row',
    height: 40,
  },
  loginIconWrapper: {
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d73352',
    width: 40,
  },
  loginIcon: {
    fontSize: 30,
    color: '#000',
  },
  loginInput: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  loginErrorText: {
    textAlign: 'center',
    color: '#0FF',
    marginBottom: 10,
  },
  loginBottomContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    marginTop: 10,
  },
  loginForgotText: {
    color: '#0FF',
  },
  loginButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: 10
  },
})

export default connect(state => ({
  jwt: state.auth.jwt,
  errorMessage: state.auth.authError,
}), dispatch => ({
  attemptLogin: (username, password) => dispatch(AuthActions.attemptLogin(username, password)),
}))(LoginModal)
