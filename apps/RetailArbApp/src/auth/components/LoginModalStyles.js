import {
  Dimensions,
  StyleSheet,
} from 'react-native'

const dialogWidth = Math.min(Dimensions.get('window').width, 300)
const dialogHeight = Math.min(Dimensions.get('window').height / 3, 175)

export const LoginModalStyles = StyleSheet.create({
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
