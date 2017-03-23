import {
  createStore,
} from 'redux'
import {
  autoRehydrate,
} from 'redux-persist'

import AppReducer from './AppReducer'

const AppStore = createStore(AppReducer, undefined, autoRehydrate())

export default AppStore
