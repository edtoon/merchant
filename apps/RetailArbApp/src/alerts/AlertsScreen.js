import React from 'react'
import {
  ListView,
  View,
} from 'react-native'

import { alerts } from './alerts'
import { AlertsRow } from './AlertsRow'
import { AlertsStyles } from './AlertsStyles'
import { AppStyles } from '../AppStyles'
import { IconBar } from '../layout/IconBar'

export class AlertsScreen extends React.Component {
  static navigationOptions = {
    title: 'Alerts',
  }

  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })

    this.state = {
      dataSource: dataSource.cloneWithRows(alerts)
    }
  }

  renderRow = (data) => {
    return (
      <AlertsRow {...data} />
    )
  }

  renderSeparator = (sectionId, rowId) => {
    return (
      <View key={rowId} style={AlertsStyles.alertsSeparator} />
    )
  }

  render() {
    return (
      <View style={AppStyles.fullScreenContainer}>
        <ListView
          style={AlertsStyles.alertsListContainer}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
        />
        <IconBar />
      </View>
    )
  }
}
