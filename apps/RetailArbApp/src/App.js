import React from 'react'
import {
  AsyncStorage,
} from 'react-native'
import {
  Provider,
} from 'react-redux'
import {
  persistStore,
} from 'redux-persist'

import AppWithNavigationState from './AppWithNavigationState'
import AppStore from './AppStore'

export default class App extends React.Component {
  componentDidMount() {
    persistStore(AppStore, { storage: AsyncStorage })
  }

  render() {
    return (
      <Provider store={AppStore}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}
