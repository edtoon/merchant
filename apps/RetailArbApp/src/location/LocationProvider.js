import {
  Platform,
} from 'react-native'
import {
  call,
  fork,
  put,
} from 'redux-saga/effects';

const POSITION = 'location/POSITION'
const initialState = {
  position: null,
  latitude: null,
  longitude: null,
  time: null,
}
let locationPermissions = {
  fine: true,
  coarse: true,
}
let watchId = null

export const LocationReducer = (state = initialState, action) => {
  console.log('In LocationReducer', action)
  switch(action.type) {
    case POSITION:
      return {
        ...state,
        position: action.position,
        latitude: action.latitude,
        longitude: action.longitude,
        time: action.time,
      }
    default:
      return state
  }
}

export const changePosition = (position, latitude, longitude, time) => {
  console.log('In changePosition', position)
  return {
    type: POSITION,
    position,
    latitude,
    longitude,
    time,
  }
}

const updatePosition = (position) => {
  const time = (new Date().getTime() / 1000)

  console.log('In updatePosition at time: ' + time, position)

  if (!position || !position.coords) {
    put(changePosition(null, null, null, time))
  } else {
    put(changePosition(
      JSON.stringify(position),
      position.coords.latitude, position.coords.longitude,
      time
    ))
  }
}

const getCurrentPosition = () => {
  console.log('In getCurrentPosition', watchId)

  navigator.geolocation.getCurrentPosition(
    (position) => updatePosition,
    (e) => console.log(e),
    {
      enableHighAccuracy: false,
      timeout: 20000,
    }
  )
}

const startPositionWatcher = () => {
  console.log('In startPositionWatcher', watchId)

  watchId = navigator.geolocation.watchPosition(
    (position) => updatePosition,
    (e) => console.log('Error in watchPosition', e)
  )

  console.log('startWatchPosition got watchId', watchId)
}

const cancelPositionWatcher = () => {
  console.log('In cancelPositionWatcher', watchId)

  navigator.geolocation.clearWatch(watchId)

  watchId = null
}

function* sagaWatchPosition(action) {
  if (Platform.OS === 'android' && Platform.version >= 23) {
    const hasFine = yield call(PermissionsAndroid.check, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

    if (!hasFine) {
      const requestFineResult = yield call(
        PermissionsAndroid.request,  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Retail Arbitrage High-Accuracy Location',
          message: 'The Retail Arbitrage app needs access to your location to ' +
          'receive BOLO alerts in your vicinity and provide driving directions.'
        }
      )

      locationPermissions.fine = (requestFineResult === PermissionsAndroid.RESULTS_GRANTED)
    }

    const hasCoarse = yield call(PermissionsAndroid.check, PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)

    if (!hasCoarse) {
      const requestCoarseResult = yield call(
        PermissionsAndroid.request, PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Retail Arbitrage Coarse-Accuracy Location',
          message: 'The Retail Arbitrage app needs access to your location to ' +
          'receive BOLO alerts in your vicinity and provide driving directions.'
        }
      )

      locationPermissions.coarse = (requestCoarseResult === PermissionsAndroid.RESULTS_GRANTED)
    }

    // TODO
    // alert('Unable to obtain permissions for location information, certain features in the Retail Arbitrage app will be unavailable.')
  }

  console.log('Resolved location permissions', locationPermissions)

  if (locationPermissions.fine || locationPermissions.coarse) {
    yield call(getCurrentPosition)
    yield call(startPositionWatcher)
  }
}

export const LocationSagas = [
  fork(sagaWatchPosition)
]
