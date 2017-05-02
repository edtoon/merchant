/* eslint-disable react/jsx-indent-props, indent */

import React from 'react'
import fetch from 'isomorphic-fetch'
import { getCookie } from 'gg-common/utils/browser'
import { apiHost } from 'gg-common/utils/hosts'

export default class YouTubeForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      token: ''
    }
  }

  async componentDidMount () {
    const tokenRes = await fetch('//' + apiHost() + '/youtube/token', {
      headers: {
        Authorization: 'Bearer ' + getCookie('jwt')
      },
      credentials: 'include'
    })
    let token = ''
    let url = ''

    if (tokenRes.ok) {
      token = await tokenRes.text()
    }

    if (!token) {
      const urlRes = await fetch('//' + apiHost() + '/youtube/url', {
        headers: {
          Authorization: 'Bearer ' + getCookie('jwt')
        },
        credentials: 'include'
      })

      url = await urlRes.text()
    }

    this.setState({token, url})
  }

  render () {
    if (this.state.token) {
      return (
        <b>Token: {this.state.token}</b>
      )
    }

    return (
      <div className='box'>
        <a href={this.state.url}>Authenticate</a>
      </div>
    )
  }
}
