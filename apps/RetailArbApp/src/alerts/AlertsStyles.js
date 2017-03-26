import {
  Dimensions,
  StyleSheet,
} from 'react-native'

const alertsWidth = Dimensions.get('window').width
const alertsHeight = Dimensions.get('window').height - 165

export const AlertsStyles = StyleSheet.create({
  alertsListContainer: {
    position: 'absolute',
    width: alertsWidth,
    height: alertsHeight,
    marginTop: 10,
    marginBottom: 10,
  },
  alertsRowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  alertsSponsoredRow: {
    backgroundColor: '#0B5',
  },
  alertsRowText: {
    fontSize: 16,
    marginLeft: 12,
  },
  alertsRowPhoto: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  alertsSeparator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#BEBEBE',
  },
})
