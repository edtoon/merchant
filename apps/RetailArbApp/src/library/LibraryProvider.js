import {
  createAction,
} from 'redux-act'
import {
  takeLatest,
} from 'redux-saga/effects';

export const addVideo = createAction(
  'library/addVideo', (path, startTime, startLatitude, startLongitude, endTime, endLatitude, endLongitude) => ({
    path, startTime, startLatitude, startLongitude, endTime, endLatitude, endLongitude
  })
)

export function* sagaAddVideo(action) {
  const {path, startTime, startLatitude, startLongitude, endTime, endLatitude, endLongitude} = action.payload

  console.log(
    'Video uri: ' + path + ', ' +
    'started at: ' + startTime + ' (' + startLatitude + ',' + startLongitude + ')' + ', ' +
    'ended at: ' + endTime + ' (' + endLatitude + ',' + endLongitude + ')'
  )
}

export const sagas = [
  takeLatest([addVideo], sagaAddVideo),
]
