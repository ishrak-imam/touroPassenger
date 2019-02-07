
import React, { Component } from 'react'
import {
  View, Text, StyleSheet, TextInput,
  KeyboardAvoidingView, TouchableOpacity,
  ActivityIndicator, Keyboard, ImageBackground
} from 'react-native'
import { networkActionDispatcher } from '../../utils/actionDispatcher'
import { loginReq } from './action'
import { Colors, Images } from '../../theme'
import { checkSSN, checkBookingCode } from '../../utils/stringHelpers'
import { getLogin } from '../../selectors'
import { connect } from 'react-redux'
import Translator from '../../utils/translator'

const _T = Translator('Auth')

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      password: '',
      isValidBooking: false,
      isValidSSN: false,
      passTyped: '',
      loginType: ''
    }
  }

  _checkIsReady = () => {
    const { user, password } = this.state
    this.setState({
      isValidBooking: checkBookingCode(user),
      isValidSSN: checkSSN(user),
      passTyped: !!password
    }, this._setLoginType)
  }

  _setLoginType = () => {
    let { loginType, isValidBooking, isValidSSN } = this.state
    if (isValidBooking) loginType = 'booking'
    if (isValidSSN) loginType = 'ssn'
    this.setState({ loginType })
  }

  _login = () => {
    Keyboard.dismiss()
    const { user, password, loginType } = this.state
    networkActionDispatcher(loginReq({
      [loginType]: user,
      password,
      loginType,
      failMsg: _T('loginFail')
    }))
  }

  _handleChange = field => text => {
    this.setState({ [field]: text }, this._checkIsReady)
  }

  _toRegistration = () => {
    this.props.navigation.navigate('Registration')
  }

  render () {
    const { user, password, isValidBooking, isValidSSN, passTyped } = this.state
    const { login } = this.props
    const isLoading = login.get('isLoading')
    const isDisabled = (isLoading || !(isValidBooking || isValidSSN) || !passTyped)
    const forgotDisabled = (isLoading || !(isValidBooking || isValidSSN))
    const backgroundColor = isDisabled ? Colors.buttonDisable : Colors.blue
    const color = forgotDisabled ? Colors.steel : Colors.blue

    return (
      <KeyboardAvoidingView style={ss.container} behavior='padding'>

        <ImageBackground source={Images.banner} style={ss.banner}>
          <View style={ss.logoContainer} />
        </ImageBackground>

        <View style={ss.loginContainer}>
          <TextInput
            style={ss.inputElements}
            onChangeText={this._handleChange('user')}
            value={user}
            placeholder='Booking/SSN'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            placeholderTextColor={Colors.charcoal}
            keyboardType='numeric'
            editable={!isLoading}
          />
          <TextInput
            style={ss.inputElements}
            onChangeText={this._handleChange('password')}
            value={password}
            placeholder='Password'
            secureTextEntry
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            placeholderTextColor={Colors.charcoal}
            editable={!isLoading}
          />
          <TouchableOpacity style={[ss.loginButton, { backgroundColor }]} disabled={isDisabled} onPress={this._login}>
            {isLoading ? <ActivityIndicator color={Colors.white} /> : <Text style={ss.loginText}>Login</Text>}
          </TouchableOpacity>
          <View style={ss.options}>
            <TouchableOpacity disabled={isLoading} onPress={this._toRegistration}>
              <Text style={ss.optionText}>Create an account</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={forgotDisabled}>
              <Text style={[ss.optionText, { color }]}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>

      </KeyboardAvoidingView>
    )
  }
}

const stateToProps = state => ({
  login: getLogin(state)
})

export default connect(stateToProps, null)(LoginScreen)

const ss = StyleSheet.create({
  container: {
    flex: 1
  },
  banner: {
    flex: 1.5
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10
  },
  inputElements: {
    height: 45,
    width: 300,
    backgroundColor: Colors.steel,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10
  },
  loginButton: {
    height: 45,
    width: 300,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    fontWeight: 'bold',
    color: Colors.white
  },
  options: {
    height: 45,
    width: 300,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  optionText: {
    fontWeight: 'bold',
    color: Colors.blue
  }
})
