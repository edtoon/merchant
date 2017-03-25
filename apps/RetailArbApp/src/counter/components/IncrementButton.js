import React from 'react'
import {
  Button,
} from 'react-native'
import {
  connect,
} from 'react-redux'

import * as CounterActions from '../CounterActions'

class IncrementButton extends React.Component {
  render() {
    return (
      <Button
        title='Increment'
        onPress={this.props.increment}
      />
    )
  }
}

export default connect(state => ({
  count: state.counter.count,
}), dispatch => ({
  increment: () => dispatch(CounterActions.increment()),
}))(IncrementButton)
