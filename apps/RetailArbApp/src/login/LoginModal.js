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
    }
    this.logInput = this.logInput.bind(this)
  }

  logInput() {
    console.log('Username: ' + this.state.username + ', Password: ' + this.state.password)
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
                <Text>Forgot Password?</Text>
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
