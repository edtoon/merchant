import {
  PermissionsAndroid,
  Platform,
} from 'react-native'
import { createAction, createReducer } from 'redux-act'
import {
  eventChannel,
} from 'redux-saga'
import {
  call,
  fork,
  put,
  take,
} from 'redux-saga/effects';

import {
  unixTimestamp,
  valueUnlessUndef,
} from 'gg-common/utils/lang'

const REQUIRE_PERMISSIONS_CHECK = (Platform.OS === 'android' && Platform.Version >= 23)
const permissionChecks = {
  High: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  Low: PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
}
const initialState = {
  time: null,
  latitude: null,
  longitude: null,
}
export const changePosition = createAction('location/changePosition', (time, latitude, longitude) => ({time, latitude, longitude}))

export const initializeLocation = createAction('location/initializeLocation')
export const LocationReducer = createReducer(
  {
    [changePosition]: (state, {time, latitude, longitude}) => {
      if (valueUnlessUndef(time) === null || valueUnlessUndef(latitude) === null || valueUnlessUndef(longitude) === null ||
        latitude === state.latitude || longitude === state.longitude) {
        return state
      }

      return ({ ...state, time, latitude, longitude })
    }
  },
  initialState
)

const createPositionWatcher = (navigatorFunction, highAccuracy) => {
  return eventChannel(emit => {
    const watchId = navigatorFunction(
      (position) => {
        const time = unixTimestamp()

        if (position && position.coords) {
          emit({time, latitude: position.coords.latitude, longitude: position.coords.longitude})
        }
      },
      (e) => {
        console.log('positionWatcher.updatePosition emitting error', e)
        emit({error: e})
      },
      {
        enableHighAccuracy: highAccuracy,
        timeout: 20000,
      }
    )

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  })
}

function* sagaWatchPosition() {
  yield take([initializeLocation])

  const permissionResults = {
    High: !REQUIRE_PERMISSIONS_CHECK,
    Low: !REQUIRE_PERMISSIONS_CHECK,
  }

  if (REQUIRE_PERMISSIONS_CHECK) {
    for(const permissionDesc in permissionChecks) {
      const permission = permissionChecks[permissionDesc]
      const hasPermission = yield call(PermissionsAndroid.check, permission)

      if (hasPermission) {
        permissionResults[permissionDesc] = true
      } else {
        const requestPermissionResult = yield call(
          PermissionsAndroid.request,  permission,
          {
            title: `Retail Arbitrage ${permissionDesc}-Accuracy Location`,
            message: 'The Retail Arbitrage app needs access to your location to ' +
            'receive BOLO alerts in your vicinity and provide driving directions.'
          }
        )

        permissionResults[permissionDesc] = (requestPermissionResult === PermissionsAndroid.RESULTS_GRANTED)
      }
    }
  }

  if (!permissionResults.High && !permissionResults.Low) {
    // TODO display to user somehow
    console.log('Unable to obtain permissions for location information, certain features in the Retail Arbitrage app will be unavailable.')
  } else {
    const currentChannel = yield call(createPositionWatcher, navigator.geolocation.getCurrentPosition, permissionResults.High)
    const currentPayload = yield take(currentChannel)
    const {error: currentError, time: currentTime, latitude: currentLatitude, longitude: currentLongitude} = currentPayload

    if (!currentError) {
      yield put(changePosition(currentTime, currentLatitude, currentLongitude))
    }

    currentChannel.close()

    const watcherChannel = yield call(createPositionWatcher, navigator.geolocation.watchPosition, permissionResults.High)

    while (true) {
      const watcherPayload = yield take(watcherChannel)
      const {error: watcherError, time: watcherTime, latitude: watcherLatitude, longitude: watcherLongitude} = watcherPayload

      if (!watcherError) {
        yield put(changePosition(watcherTime, watcherLatitude, watcherLongitude))
      }
    }
  }
}

export const LocationSagas = [
  fork(sagaWatchPosition),
]
