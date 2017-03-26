import React from 'react'
import {
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

import { IconBarStyles } from './IconBarStyles'

export const IconBar = connect(state => ({}), dispatch => ({
  toAlerts: () => dispatch(NavigationActions.navigate({ routeName: 'Alerts' })),
  toSettings: () => dispatch(NavigationActions.navigate({ routeName: 'Settings' })),
}))(
  class _IconBar extends React.Component {
    constructor(props) {
      super(props)
    }

    handleDummy = () => {}

    render() {
      return (
        <View style={IconBarStyles.iconBarContainer}>
          <TouchableOpacity onPress={this.props.toAlerts}>
            <Icon name='envelope-o' style={IconBarStyles.iconBarIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleDummy}>
            <Icon name='video-camera' style={IconBarStyles.iconBarIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleDummy}>
            <Icon name='film' style={IconBarStyles.iconBarIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.toSettings}>
            <Icon name='gear' style={IconBarStyles.iconBarIcon} />
          </TouchableOpacity>
        </View>
      )
    }
  }
)
