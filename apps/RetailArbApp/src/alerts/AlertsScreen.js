import React from 'react'
import {
  ListView,
  PermissionsAndroid,
  Platform,
  Text,
  View,
} from 'react-native'
import {
  connect,
} from 'react-redux'

import { alerts } from './alerts'
import { AlertsRow } from './AlertsRow'
import { AlertsStyles } from './AlertsStyles'
import { AppStyles } from '../AppStyles'
import { IconBar } from '../layout/IconBar'
import { CopyrightLine } from '../layout/CopyrightLine'

export const AlertsScreen = connect(state => ({
  latitude: state.location.latitude,
  longitude: state.location.longitude,
}))(
  class _AlertsScreen extends React.Component {
    static navigationOptions = {
      title: 'Alerts',
    }

    constructor(props) {
      super(props)

      const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      })

      this.state = {
        dataSource: dataSource.cloneWithRows(alerts),
        position: null,
      }
    }

    renderRow = (data) => {
      return (
        <AlertsRow latitude={this.props.latitude || null} longitude={this.props.longitude || null} {...data} />
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
          <CopyrightLine />
        </View>
      )
    }
  }
)
