import {
  createStore,
} from 'redux'
import {
  autoRehydrate,
} from 'redux-persist'

import AppReducer from './AppReducer'

export default createStore(AppReducer, undefined, autoRehydrate())
