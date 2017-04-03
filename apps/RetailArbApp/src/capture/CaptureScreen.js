import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Camera from 'react-native-camera'
import {
  connect,
} from 'react-redux'

import {
  unixTimestamp,
} from 'gg-common/utils/lang'

import * as LibraryProvider from '../library/LibraryProvider'

@connect(
  state => ({
    latitude: state.location.latitude,
    longitude: state.location.longitude,
  }),
  dispatch => ({
    addVideo: (path, startTime, startLatitude, startLongitude, endTime, endLatitude, endLongitude) => dispatch(
      LibraryProvider.addVideo(path, startTime, startLatitude, startLongitude, endTime, endLatitude, endLongitude)
    ),
  })
)
export class CaptureScreen extends React.Component {
  static navigationOptions = {
    title: 'Capture',
  }

  constructor (props) {
    super(props)
    this.state = {
      isRecording: false,
      startTime: null,
      startLatitude: null,
      startLongitude: null,
      flash: Camera.constants.FlashMode.auto,
      type: Camera.constants.Type.front,
    }
    this.handleRecordButtonPress = this.handleRecordButtonPress.bind(this)
    this.switchFlash = this.switchFlash.bind(this)
    this.switchType = this.switchType.bind(this)
  }

  get flashIcon () {
    switch (this.state.flash) {
      case Camera.constants.FlashMode.auto:
        return "flash-auto"
      case Camera.constants.FlashMode.on:
        return "flash"
      case Camera.constants.FlashMode.off:
        return "flash-off"
    }
  }

  get typeIcon () {
    switch(this.state.type) {
      case Camera.constants.Type.back:
        return "camera-rear"
      case Camera.constants.Type.front:
        return "camera-front"
    }
  }

  get controlIcon () {
    let color, size, name
    if (!this.state.isRecording) {
      name = "record-rec"
      size = 90
      color = "#ff1300"
    } else {
      name = "stop-circle-outline"
      color = "#FFFFFF"
      size = 70
    }
    return (<Icon style={styles.textShadow} name={name} size={size} color={color} />)
  }

  handleRecordButtonPress () {
    if (!this.state.isRecording) {
      this.startRecording()
    } else {
      this.stopRecording()
    }
  }

  startRecording () {
    this.setState({
      isRecording: true,
      startTime: unixTimestamp(),
      startLatitude: this.props.latitude,
      startLongitude: this.props.longitude,
    })
    this.refs.camera.capture({
      captureAudio: true,
      captureMode: Camera.constants.CaptureMode.video
    })
      .then(e => {
        this.props.addVideo(
          e.path,
          this.state.startTime, this.state.startLatitude, this.state.startLongitude,
          unixTimestamp(), this.props.latitude, this.props.longitude
        )
      })
      .catch(err => console.error(`Can't record video`, err))
  }

  stopRecording () {
    this.refs.camera.stopCapture()
    this.setState({
      isRecording: false,
    })
  }

  switchFlash () {
    let newFlash = Camera.constants.FlashMode.auto

    switch(this.state.flash) {
      case Camera.constants.FlashMode.auto:
        newFlash = Camera.constants.FlashMode.on
        break
      case Camera.constants.FlashMode.on:
        newFlash = Camera.constants.FlashMode.off
        break
    }

    this.setState({flash: newFlash})
  }

  switchType () {
    let newType = Camera.constants.Type.front

    if (this.state.type === Camera.constants.Type.front) {
      newType = Camera.constants.Type.back
    }

    this.setState({type: newType})
  }

  render () {
    return (
      <View style={styles.container}>
        <Camera
          ref="camera"
          style={styles.camera}
          aspect={Camera.constants.Aspect.fill}
          type={this.state.type}
          keepAwake={true}
          captureAudio={true}
          captureMode={Camera.constants.CaptureMode.video}
          captureQuality="high"
          orientation={Camera.constants.Orientation.auto}
          flashMode={Camera.constants.FlashMode.off}
          torchMode={Camera.constants.TorchMode.off}
          captureTarget={Camera.constants.CaptureTarget.disk}
        />
        {!this.state.isRecording && <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity style={styles.topButton} onPress={this.switchFlash}>
            <Icon name={this.flashIcon} size={40} color="#FFFFFF" style={styles.textShadow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton} onPress={this.switchType}>
            <Icon name={this.typeIcon} size={40} color="#FFFFFF" style={styles.textShadow} />
          </TouchableOpacity>
        </View>}
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <TouchableOpacity style={styles.captureButton} onPress={this.handleRecordButtonPress}>
            {this.controlIcon}
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {},
  topButton: {
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5
  }
}
