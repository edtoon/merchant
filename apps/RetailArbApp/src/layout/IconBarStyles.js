import {
  Dimensions,
  StyleSheet,
} from 'react-native'

const containerTop = Dimensions.get('window').height - 150

export const IconBarStyles = StyleSheet.create({
  iconBarContainer: {
    position: 'absolute',
    top: containerTop,
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
