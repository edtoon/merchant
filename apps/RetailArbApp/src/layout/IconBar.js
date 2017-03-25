import React from 'react'
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const iconBarTop = Dimensions.get('window').height - 150

export class IconBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={IconBar.styles.iconBarContainer}>
        <Icon name='envelope-o' style={IconBar.styles.iconBarIcon} />
        <Icon name='video-camera' style={IconBar.styles.iconBarIcon} />
        <Icon name='film' style={IconBar.styles.iconBarIcon} />
        <Icon name='gear' style={IconBar.styles.iconBarIcon} />
      </View>
    )
  }

  static styles = StyleSheet.create({
    iconBarContainer: {
      position: 'absolute',
      top: iconBarTop,
      left: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconBarIcon: {
      fontSize: 40,
      marginLeft: 20,
      marginRight: 20,
    },
  })
}
