/* eslint-disable react/jsx-indent-props, indent */

import React from 'react'
import {
  Box,
  Button,
  Input,
  Label
} from 're-bulma'
import fetch from 'isomorphic-fetch'
import { validateEmail, validatePassword } from '../utils/validators'
import { apiHost } from '../utils/hosts'

export default class RegisterForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      emailErrorVisible: false,
      emailErrorMessage: '',
      password: '',
      passwordErrorVisible: false,
      passwordErrorMessage: '',
      confirmPassword: '',
      confirmPasswordErrorVisible: false,
      confirmPasswordErrorMessage: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEmailChange (e) {
    e.preventDefault()

    let email = e.target.value
    let valid = (email ? validateEmail(email) : true)

    this.setState({
      email: email,
      emailErrorVisible: !valid,
      emailErrorMessage: valid ? '' : 'Email address is not valid'
    })

    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }

  handlePasswordChange (e) {
    e.preventDefault()

    let password = e.target.value
    let valid = (password ? validatePassword(password) : true)

    this.setState({
      password: password,
      passwordErrorVisible: !valid,
      passwordErrorMessage: valid ? '' : 'Password must be between 8 and 20 characters long and must contain ' +
        'at least one number, one lower-case letter and one upper-case letter.'
    })

    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }

  handleConfirmPasswordChange (e) {
    e.preventDefault()

    let confirmPassword = e.target.value
    let valid = (confirmPassword === this.state.password)

    this.setState({
      confirmPassword: confirmPassword,
      confirmPasswordErrorVisible: !valid,
      confirmPasswordErrorMessage: valid ? '' : 'Password and confirmation must match each other.'
    })

    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }

  handleSubmit (e) {
    e.preventDefault()

    if (this.validateForm()) {
      fetch('//' + apiHost() + '/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: this.state.email,
          password: this.state.password
        })
      })
        .then(response => {
          console.log('Response status: ' + response.status)

          if (response.status === 200) {
            window.location = '/login'
          }
        })
        .catch(error => {
          console.log('Registration failed: ', error)
        })
    }
  }

  validateForm () {
    return this.state.email.length > 0 && this.state.emailErrorMessage.length === 0 &&
      this.state.password.length > 0 && this.state.passwordErrorMessage.length === 0 &&
      this.state.confirmPassword.length > 0 && this.state.confirmPasswordErrorMessage.length === 0
  }

  render () {
    return (
      <Box>
        <form onSubmit={this.handleSubmit}>
          <Label>Email</Label>
          <Input type='text' placeholder='user@example.org' onChange={this.handleEmailChange} hasIconRight
                 icon={this.state.emailErrorVisible ? 'fa fa-warning' : (this.state.email.length > 0 ? 'fa fa-check' : null)}
                 color={this.state.emailErrorVisible ? 'isDanger' : null}
                 help={this.state.emailErrorVisible ? {
                     color: 'isDanger',
                     text: this.state.emailErrorMessage
                   } : null}
          />
          <hr />
          <Label>Password</Label>
          <Input type='password' placeholder='********' onChange={this.handlePasswordChange} hasIconRight
                 icon={this.state.passwordErrorVisible ? 'fa fa-warning' : (this.state.password.length > 0 ? 'fa fa-check' : null)}
                 color={this.state.passwordErrorVisible ? 'isDanger' : null}
                 help={this.state.passwordErrorVisible ? {
                     color: 'isDanger',
                     text: this.state.passwordErrorMessage
                   } : null}
          />
          <Label>Confirm Password</Label>
          <Input type='password' placeholder='********' onChange={this.handleConfirmPasswordChange}
                 hasIconRight
                 icon={this.state.confirmPasswordErrorVisible ? 'fa fa-warning' : (this.state.confirmPassword.length > 0 ? 'fa fa-check' : null)}
                 color={this.state.confirmPasswordErrorVisible ? 'isDanger' : null}
                 help={this.state.confirmPasswordErrorVisible ? {
                     color: 'isDanger',
                     text: this.state.confirmPasswordErrorMessage
                   } : null}
          />
          <hr />
          <p className='control'>
            <Button color='isPrimary'>Register</Button>
          </p>
        </form>
      </Box>
    )
  }
}
