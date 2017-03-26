import {
  Dimensions,
  StyleSheet,
} from 'react-native'

const containerTop = Dimensions.get('window').height - 120

export const CopyrightLineStyles = StyleSheet.create({
  copyrightLineContainer: {
    position: 'absolute',
    top: containerTop,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyrightLineText: {
    fontSize: 12,
    marginBottom: 20,
    marginTop: 20,
  },
})
