import React from 'react'
import {
  Text,
  View
} from 'react-native'
import {
  connect,
} from 'react-redux'

import { AppStyles } from '../../AppStyles'

export const CounterMessage = connect(state => ({
  count: state.counter.count,
}))(
  class _CounterMessage extends React.Component {
    render() {
      return (
        <View>
          <Text style={AppStyles.welcome}>
            The current count is: {this.props.count}
          </Text>
        </View>
      )
    }
  }
)
