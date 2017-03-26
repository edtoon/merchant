import React from 'react'
import {
  Provider,
} from 'react-redux'

import { AppStore } from './AppStore'
import { AppWithNavigationState } from './AppWithNavigationState'

export class App extends React.Component {
  render() {
    return (
      <Provider store={AppStore}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}
