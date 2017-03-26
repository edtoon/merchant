import React from 'react'
import {
  Text,
  View,
} from 'react-native'

import { CopyrightLineStyles } from './CopyrightLineStyles'

export class CopyrightLine extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={CopyrightLineStyles.copyrightLineContainer}>
        <Text style={CopyrightLineStyles.copyrightLineText}>
          &copy; Merchant.GG, 2016 - {new Date().getFullYear()}
        </Text>
      </View>
    )
  }
}
