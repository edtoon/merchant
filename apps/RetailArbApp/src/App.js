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

import { AppStore } from './AppStore'
import { AppWithNavigationState } from './AppWithNavigationState'

export class App extends React.Component {
  componentDidMount() {
    persistStore(AppStore, {
      blacklist: ['nav'],
      storage: AsyncStorage,
    })
  }

  render() {
    return (
      <Provider store={AppStore}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}
