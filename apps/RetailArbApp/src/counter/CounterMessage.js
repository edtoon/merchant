import React from 'react'
import {
  Text,
  View
} from 'react-native'
import {
  connect,
} from 'react-redux'

import styles from '../styles'

class CounterMessage extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.welcome}>
          The current count is: {this.props.count}
        </Text>
      </View>
    )
  }
}

export default connect(state => ({
  count: state.counter.count,
}))(CounterMessage)
