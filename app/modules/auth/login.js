
import React, { Component } from 'react'
import {
  View, Text, StyleSheet, TextInput,
  KeyboardAvoidingView, TouchableOpacity,
  ActivityIndicator, Keyboard, ImageBackground
} from 'react-native'
import { networkActionDispatcher } from '../../utils/actionDispatcher'
import { loginReq } from './action'
import { Colors, Images } from '../../theme'
import { checkEmail } from '../../utils/stringHelpers'
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
      isValidEmail: '',
      passTyped: ''
    }
  }

  _checkIsReady = () => {
    const { user, password } = this.state
    this.setState({
      isValidEmail: checkEmail(user),
      passTyped: !!password
    })
  }

  _login = () => {
    Keyboard.dismiss()
    const { user, password } = this.state
    networkActionDispatcher(loginReq({
      user,
      password,
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
    const { user, password, isValidEmail, passTyped } = this.state
    const { login } = this.props
    const isLoading = login.get('isLoading')
    const isDisabled = (isLoading || !isValidEmail || !passTyped)
    const forgotDisabled = (isLoading || !isValidEmail)
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
            placeholder='Email'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            placeholderTextColor={Colors.charcoal}
            keyboardType='email-address'
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
