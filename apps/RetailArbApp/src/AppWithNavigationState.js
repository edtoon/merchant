import React from 'react'
import {
  addNavigationHelpers,
} from 'react-navigation'
import {
  connect,
} from 'react-redux'

import { AppNavigator } from './AppNavigator'

export const AppWithNavigationState = connect(state => ({
  nav: state.nav,
}))(
  class _AppWithNavigationState extends React.Component {
    render() {
      return (
        <AppNavigator navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
        })} />
      )
    }
  }
)
