/* eslint-disable react/jsx-indent-props, indent */

import React from 'react'
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
    const emailIcon = (this.state.emailErrorVisible ? 'warning' : (this.state.email.length > 0 ? 'check' : null))
    const emailControlClasses = 'control' + (emailIcon ? ' has-icon has-icon-right' : '')
    const emailInputClasses = 'input' + (this.state.emailErrorVisible ? ' is-danger' : '')
    const passwordIcon = (this.state.passwordErrorVisible ? 'warning' : (this.state.password.length > 0 ? 'check' : null))
    const passwordControlClasses = 'control' + (passwordIcon ? ' has-icon has-icon-right' : '')
    const passwordInputClasses = 'input' + (this.state.passwordErrorVisible ? ' is-danger' : '')

    return (
      <div className='box'>
        <form onSubmit={this.handleSubmit}>
          <div className='notification is-danger'
               style={{display: this.state.fetchErrorVisible ? 'block' : 'none', marginBottom: '8px'}}>
            {this.state.fetchErrorMessage}
            <button className='delete' onClick={this.handleCloseNotification} />
          </div>
          <label className='label'>Email</label>
          <p className={emailControlClasses}>
            <input className={emailInputClasses} type='text' placeholder='user@example.org'
                   onChange={this.handleEmailChange} />
            {emailIcon ? <i className='fa fa-{emailIcon}' /> : ''}
            {this.state.emailErrorVisible ? <span className='help is-danger'>{this.state.emailErrorMessage}</span> : ''}
          </p>
          <label className='label'>Password</label>
          <p className={passwordControlClasses}>
            <input className={passwordInputClasses} type='password' placeholder='********'
                   onChange={this.handlePasswordChange} />
            {passwordIcon ? <i className='fa fa-{passwordIcon}' /> : ''}
            {this.state.passwordErrorVisible ? <span className='help is-danger'>{this.state.passwordErrorMessage}</span> : ''}
          </p>
          <hr />
          <p className='control'>
            <button className='button is-primary'>Login</button>
          </p>
        </form>
      </div>
    )
  }
}
