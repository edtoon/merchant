/* eslint-disable react/jsx-indent-props, indent */

import React from 'react'
import {
  Box,
  Button,
  Input,
  Label,
  Notification
} from 're-bulma'
import fetch from 'isomorphic-fetch'
import { apiHost, uiHost } from 'gg-common/utils/hosts'
import { validateEmail, validatePassword } from 'gg-common/utils/validators'

export default class LoginForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      emailErrorVisible: false,
      emailErrorMessage: '',
      password: '',
      passwordErrorVisible: false,
      passwordErrorMessage: '',
      fetchErrorVisible: false,
      fetchErrorMessage: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCloseNotification = this.handleCloseNotification.bind(this)
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

  handleSubmit (e) {
    e.preventDefault()

    if (this.validateForm()) {
      console.log('Attempting login: ' + this.state.email)

      fetch('//' + apiHost() + '/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: this.state.email,
          password: this.state.password
        }),
        credentials: 'include'
      })
        .then(response => {
          console.log('Response status: ' + response.status)

          if (response.ok) {
            this.setState({
              fetchErrorVisible: false,
              fetchErrorMessage: ''
            })

            response.json().then(result => {
              window.location = '//' + uiHost() + '/auth?token=' + encodeURIComponent(result.token)
            })
          } else {
            response.text().then(text => {
              this.setState({
                fetchErrorVisible: true,
                fetchErrorMessage: text
              })
            })
          }
        })
        .catch(error => {
          console.log('Login failed: ', error)
          this.setState({
            fetchErrorVisible: true,
            fetchErrorMessage: error
          })
        })
    }
  }

  handleCloseNotification (e) {
    e.preventDefault()

    this.setState({
      fetchErrorVisible: false,
      fetchErrorMessage: 'Closed'
    })
  }

  validateForm () {
    return this.state.email.length > 0 && this.state.password.length > 0 &&
      this.state.emailErrorMessage.length === 0 && this.state.passwordErrorMessage.length === 0
  }

  render () {
    return (
      <Box>
        <form onSubmit={this.handleSubmit}>
          <Notification color='isDanger' enableCloseButton
                        style={{display: this.state.fetchErrorVisible ? 'block' : 'none', marginBottom: '8px'}}
                        closeButtonProps={{onClick: e => this.handleCloseNotification(e)}}>
            {this.state.fetchErrorMessage}
          </Notification>
          <Label>Email</Label>
          <Input type='text' placeholder='user@example.org' onChange={this.handleEmailChange} hasIconRight
                 icon={this.state.emailErrorVisible ? 'fa fa-warning' : (this.state.email.length > 0 ? 'fa fa-check' : null)}
                 color={this.state.emailErrorVisible ? 'isDanger' : null}
                 help={this.state.emailErrorVisible ? {
                     color: 'isDanger',
                     text: this.state.emailErrorMessage
                   } : null}
          />
          <Label>Password</Label>
          <Input type='password' placeholder='********' onChange={this.handlePasswordChange} hasIconRight
                 icon={this.state.passwordErrorVisible ? 'fa fa-warning' : (this.state.password.length > 0 ? 'fa fa-check' : null)}
                 color={this.state.passwordErrorVisible ? 'isDanger' : null}
                 help={this.state.passwordErrorVisible ? {
                     color: 'isDanger',
                     text: this.state.passwordErrorMessage
                   } : null}
          />
          <hr />
          <p className='control'>
            <Button color='isPrimary'>Login</Button>
          </p>
        </form>
      </Box>
    )
  }
}
