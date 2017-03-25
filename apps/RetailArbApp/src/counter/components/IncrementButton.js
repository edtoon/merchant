import React from 'react'
import {
  Button,
} from 'react-native'
import {
  connect,
} from 'react-redux'

import * as CounterActions from '../CounterActions'

export const IncrementButton = connect(state => ({
  count: state.counter.count,
}), dispatch => ({
  increment: () => dispatch(CounterActions.increment()),
}))(
  class _IncrementButton extends React.Component {
    render() {
      return (
        <Button
          title='Increment'
          onPress={this.props.increment}
        />
      )
    }
  }
)
