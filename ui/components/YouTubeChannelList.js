/* eslint-disable react/jsx-indent-props, indent */

import React from 'react'
import fetch from 'isomorphic-fetch'
import { getCookie } from 'gg-common/utils/browser'
import { apiHost } from 'gg-common/utils/hosts'

export default class YouTubeChannelList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      channels: []
    }
  }

  async componentDidMount () {
    const channelsResponse = await fetch('//' + apiHost() + '/youtube/channels', {
      headers: {
        Authorization: 'Bearer ' + getCookie('jwt')
      },
      credentials: 'include'
    })

    if (channelsResponse.ok) {
      const responseText = await channelsResponse.text()

      console.log('Channels response', responseText)

      const responseJson = JSON.parse(responseText)

      if (responseJson.length) {
        this.setState({channels: responseJson})
      }
    }
  }

  render () {
    return (
      <ul>
        {this.state.channels.map(channel =>
          <li>Channel: <a href={'https://www.youtube.com/channel/' + channel.id}>{channel.snippet.title} ({channel.id})</a></li>
        )}
      </ul>
    )
  }
}
