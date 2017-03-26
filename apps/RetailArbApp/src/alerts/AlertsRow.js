import React from 'react'
import {
  Image,
  Text,
  View,
} from 'react-native'

import { AlertsStyles } from './AlertsStyles'

const randomData = [
  { title: '$40+ Profit Per Ladies Shirts', category: 'BOLO', location: 'Ross In-Store', },
  { title: '75% Off Store-Wide', category: 'Sale', location: 'Goodwill Outlet', },
  { title: '45% Off Fragrances, $80+ Profit', category: 'Clearance', location: 'Armani Exchange', },
  { title: 'Blue Light Special: DVDs', category: 'Sale', location: 'K-Mart', },
  { title: '3rd-Party Ink 40% Off', category: 'Sponsored', location: 'InkHero.com', },
]

const randomAlert = () => {
  const randomNumber = Math.floor(Math.random() * (randomData.length - 1 + 1));

  return randomData[randomNumber]

}

export const AlertsRow = (props) => {
  const alert = randomAlert()
  let rowStyles = [AlertsStyles.alertsRowContainer]

  if (alert.category === 'Sponsored') {
    rowStyles = [AlertsStyles.alertsSponsoredRow, ...rowStyles]
  }

  return (
    <View style={rowStyles}>
      <Image source={{uri: props.picture.large}} style={AlertsStyles.alertsRowPhoto} />
      <Text style={AlertsStyles.alertsRowText}>
        {`${alert.title}\nCategory: ${alert.category}\nLocation: ${alert.location}`}
      </Text>
    </View>
  )
}
