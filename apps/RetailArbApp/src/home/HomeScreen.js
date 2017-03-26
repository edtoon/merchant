import React from 'react'
import {
  Linking,
  Text,
  View,
} from 'react-native'

import { AppStyles } from '../AppStyles'
import { LoginModal } from '../auth/components/LoginModal'
import { IconBar } from '../layout/IconBar'
import { CopyrightLine } from '../layout/CopyrightLine'

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  }

  goMerchantGG = () => Linking.openURL('https://merchant.gg/')

  render() {
    return (
      <View style={AppStyles.centeredContainer}>
        <LoginModal />
        <Text style={{fontSize: 50}}>Retail Arbitrage</Text>
        <Text style={{fontSize: 15}}>A tool by </Text><Text
          style={{fontSize: 15, color: 'blue'}} onPress={this.goMerchantGG}>Merchant.GG</Text>
        <IconBar />
        <CopyrightLine />
      </View>
    )
  }
}
