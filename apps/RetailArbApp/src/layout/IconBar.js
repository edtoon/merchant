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

@connect(
  state => ({
    nav: state.nav
  }),
  dispatch => ({
    execNavigate: (routeName) => dispatch(
      NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
          NavigationActions.navigate({ routeName }),
        ]
      })
    )
  })
)
export class IconBar extends React.Component {
  constructor(props) {
    super(props)
  }

  handleDummy = () => {}

  handleNavigate(routeName) {
    return () => {
      const {nav} = this.props
      const currentRoute = nav.routes[nav.index].routeName

      if (routeName !== currentRoute) {
        this.props.execNavigate(routeName)
      }
    }
  }

  render() {
    const {nav} = this.props
    const currentRoute = nav.routes[nav.index].routeName

    return (
      <View style={IconBarStyles.iconBarContainer}>
        {currentRoute === 'Alerts' ?
          <Icon name='envelope-o' style={IconBarStyles.iconBarIcon} />
          :
          <TouchableOpacity onPress={this.handleNavigate('Alerts')}>
            <Icon name='envelope-o' style={IconBarStyles.iconBarIcon} />
          </TouchableOpacity>
        }
        <TouchableOpacity onPress={this.handleDummy}>
          <Icon name='video-camera' style={IconBarStyles.iconBarIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleDummy}>
          <Icon name='film' style={IconBarStyles.iconBarIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleNavigate('Settings')}>
          <Icon name='gear' style={IconBarStyles.iconBarIcon} />
        </TouchableOpacity>
      </View>
    )
  }
}
