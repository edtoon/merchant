import {
  Dimensions,
  StyleSheet,
} from 'react-native'

const [screenWidth, screenHeight] = [Dimensions.get('window').width, Dimensions.get('window').height]
const [dialogWidth, dialogHeight] = [Math.min(screenWidth, 300), Math.min(screenHeight / 3, 175)]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  loginWrapper: {
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 20,
    width: dialogWidth,
    height: dialogHeight,
    backgroundColor: '#b37',
    borderWidth: 5,
    borderColor: '#a15',
  },
  loginInputContainer: {
    flexDirection: 'row',
    height: 40,
  },
  loginIconWrapper: {
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d73352',
    width: 40,
  },
  loginIcon: {
    fontSize: 30,
    color: '#000',
  },
  loginInput: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  loginErrorText: {
    textAlign: 'center',
    color: '#0FF',
    marginBottom: 10,
  },
  loginBottomContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    marginTop: 10,
  },
  loginForgotText: {
    color: '#0FF',
  },
  loginButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: 10
  },
})

export default styles
