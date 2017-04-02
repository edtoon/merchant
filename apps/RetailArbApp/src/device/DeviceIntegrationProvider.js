import {
  PermissionsAndroid,
  Platform,
} from 'react-native'
import {
  createAction,
  createReducer
} from 'redux-act'
import {
  eventChannel,
} from 'redux-saga'
import {
  call,
  fork,
  put,
  take,
} from 'redux-saga/effects'

import {
  unixTimestamp,
  valueUnlessUndef,
} from 'gg-common/utils/lang'

const REQUIRE_PERMISSIONS_CHECK = (Platform.OS === 'android' && Platform.Version >= 23)
const REQUIRED_PERMISSIONS = [
  {
    permission: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    title: 'High-Accuracy Location',
    message: 'The Retail Arbitrage app needs access to your location to ' +
      'receive BOLO alerts in your vicinity and provide driving directions.',
  },
  {
    title: 'Low-Accuracy Location',
    permission: PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    message: 'The Retail Arbitrage app needs access to your location to ' +
      'receive BOLO alerts in your vicinity and provide driving directions.',
  },
  {
    permission: PermissionsAndroid.PERMISSIONS.CAMERA,
    title: 'Use Camera',
    message: 'The Retail Arbitrage app needs access to your camera to capture video of your shopping trips ' +
    'to upload to social media.',
  },
  {
    permission: PermissionsAndroid.PERMISSIONS.RECORD_VIDEO,
    title: 'Record Video',
    message: 'The Retail Arbitrage app needs access to record video of your sourcing trips ' +
    'to upload to social media.',
  },
  {
    permission: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    title: 'Record Audio',
    message: 'The Retail Arbitrage app needs access to record audio for ' +
      'videos of your sourcing trips.',
  },
  {
    permission: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    title: 'External Storage Write',
    message: 'The Retail Arbitrage app needs write captured videos to your external storage.',
  },
  {
    permission: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    title: 'External Storage Read',
    message: 'The Retail Arbitrage app needs read captured videos from your external storage to upload them.',
  },
]
const initialState = {
  time: null,
  latitude: null,
  longitude: null,
}
export const changePosition = createAction('location/changePosition', (time, latitude, longitude) => ({time, latitude, longitude}))
export const initializeLocation = createAction('location/initializeLocation')

export const reducer = createReducer(
  {
    [changePosition]: (state, {time, latitude, longitude}) => {
      if (valueUnlessUndef(time) === null || valueUnlessUndef(latitude) === null || valueUnlessUndef(longitude) === null ||
        latitude === state.latitude || longitude === state.longitude) {
        return state
      }

      return ({ ...state, time, latitude, longitude })
    },
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

function* sagaDeviceIntegration() {
  yield take([initializeLocation])

  let hasLocationPermission = true
  let useHighAccuracy = true

  if (REQUIRE_PERMISSIONS_CHECK) {
    hasLocationPermission = false
    useHighAccuracy = false

    for(let i = 0; i < REQUIRED_PERMISSIONS.length; i++) {
      const requiredPermission = REQUIRED_PERMISSIONS[i]
      const permission = requiredPermission.permission

      if(!permission) {
        console.log('Unrecognized permission', requiredPermission)
      } else {
        let hasPermission = yield call(PermissionsAndroid.check, permission)

        if (!hasPermission) {
          const requestPermissionResult = yield call(
            PermissionsAndroid.request, permission, {title: 'Title of Permission', message: 'Message for Permission'}
          )

          hasPermission = (requestPermissionResult === PermissionsAndroid.RESULTS_GRANTED)
        }

        if (hasPermission) {
          switch (permission) {
            case PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION:
              useHighAccuracy = true;
            case PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION:
              hasLocationPermission = true
              break;
          }
        }
      }
    }
  }

  if (!hasLocationPermission) {
    // TODO display to user somehow
    console.log('Unable to obtain permissions for location information, certain features in the Retail Arbitrage app will be unavailable.')
  } else {
    const currentChannel = yield call(createPositionWatcher, navigator.geolocation.getCurrentPosition, useHighAccuracy)
    const currentPayload = yield take(currentChannel)
    const {error: currentError, time: currentTime, latitude: currentLatitude, longitude: currentLongitude} = currentPayload

    if (!currentError) {
      yield put(changePosition(currentTime, currentLatitude, currentLongitude))
    }

    currentChannel.close()

    const watcherChannel = yield call(createPositionWatcher, navigator.geolocation.watchPosition, useHighAccuracy)

    while (true) {
      const watcherPayload = yield take(watcherChannel)
      const {error: watcherError, time: watcherTime, latitude: watcherLatitude, longitude: watcherLongitude} = watcherPayload

      if (!watcherError) {
        yield put(changePosition(watcherTime, watcherLatitude, watcherLongitude))
      }
    }
  }
}

export const sagas = [
  fork(sagaDeviceIntegration),
]
