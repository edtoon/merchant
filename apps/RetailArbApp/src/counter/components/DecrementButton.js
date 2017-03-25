import React from 'react'
import {
  Button,
} from 'react-native'
import {
  connect,
} from 'react-redux'

import * as CounterActions from '../CounterActions'

class DecrementButton extends React.Component {
  render() {
    return (
      <Button
        title='Decrement'
        onPress={this.props.decrement}
      />
    )
  }
}

export default connect(state => ({
  count: state.counter.count,
}), dispatch => ({
  decrement: () => dispatch(CounterActions.decrement()),
}))(DecrementButton)