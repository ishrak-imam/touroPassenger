
import React, { Component } from 'react'
import {
  View, StyleSheet, TextInput,
  TouchableOpacity, Text, ActivityIndicator
} from 'react-native'
import { Colors } from '../../theme'
import Header from '../../components/header'
import Translator from '../../utils/translator'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { checkSSN } from '../../utils/stringHelpers'
import { ssnDataReq, clearSSNData } from './action'
import { actionDispatcher, networkActionDispatcher } from '../../utils/actionDispatcher'
import { connect } from 'react-redux'
import { getLogin } from '../../selectors'
import debounce from '../../utils/debounce'

const _T = Translator('Auth')

class Registration extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ssn: '',
      isValidSSN: false
    }
    this._checkSSNDebounce = debounce(this._checkSSN, 200)
    this._clearSSNData()
  }

  _clearSSNData = () => {
    actionDispatcher(clearSSNData())
  }

  _handleChange = field => text => {
    this.setState({ [field]: text }, this._checkSSNDebounce)
  }

  _checkSSN = () => {
    const { ssn } = this.state
    this.setState({ isValidSSN: checkSSN(ssn) }, this._requestSSNData)
  }

  _requestSSNData = () => {
    const { ssn, isValidSSN } = this.state
    if (isValidSSN) {
      networkActionDispatcher(ssnDataReq({
        ssn,
        failMsg: 'SSN look up failed'
      }))
    }
  }

  render () {
    const { navigation, login } = this.props
    const { ssn, isValidSSN } = this.state
    const isLoading = login.get('isLoading')
    const ssnData = login.get('ssnData')

    const isDisabled = !isValidSSN || !ssnData.size || isLoading
    const backgroundColor = isDisabled ? Colors.buttonDisable : Colors.blue

    return (
      <View style={ss.screenWrapper}>
        <Header icon='back' title={_T('registration')} navigation={navigation} />

        <KeyboardAwareScrollView
          style={ss.container}
          contentContainerStyle={ss.scrollView}
          extraScrollHeight={50}
          enableOnAndroid
          keyboardShouldPersistTaps='always'
        >

          <TextInput
            style={ss.inputElements}
            onChangeText={this._handleChange('ssn')}
            placeholder='Social security number'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            placeholderTextColor={Colors.charcoal}
            value={ssn}
            editable={!isValidSSN || !isLoading}
          />

          <TextInput
            style={ss.inputElements}
            placeholder='First name'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            placeholderTextColor={Colors.charcoal}
            value={ssnData.get('FirstName')}
          />

          <TextInput
            style={ss.inputElements}
            placeholder='Last name'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            placeholderTextColor={Colors.charcoal}
            value={ssnData.get('LastName')}
          />

          <TextInput
            style={ss.inputElements}
            onChangeText={() => {}}
            placeholder='Address'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            placeholderTextColor={Colors.charcoal}
            value={ssnData.get('Address')}
          />

          <View style={ss.doubleInput}>

            <TextInput
              style={ss.zip}
              placeholder='Zip'
              autoCapitalize='none'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              placeholderTextColor={Colors.charcoal}
              value={ssnData.get('Zip')}
            />

            <TextInput
              style={ss.city}
              placeholder='City'
              autoCapitalize='none'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              placeholderTextColor={Colors.charcoal}
              value={ssnData.get('City')}
            />

          </View>

          <TextInput
            style={ss.inputElements}
            placeholder='Email'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            placeholderTextColor={Colors.charcoal}
            keyboardType='email-address'
            value={ssnData.get('Email')}
          />

          <TouchableOpacity style={[ss.registerButton, { backgroundColor }]} disabled={isDisabled} onPress={() => {}}>
            {isLoading ? <ActivityIndicator color={Colors.white} /> : <Text style={ss.registerText}>Register</Text>}
          </TouchableOpacity>

        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const stateToProps = state => ({
  login: getLogin(state)
})

export default connect(stateToProps, null)(Registration)

const ss = StyleSheet.create({
  screenWrapper: {
    flex: 1
  },
  container: {
    paddingTop: 30,
    paddingBottom: 10
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputElements: {
    height: 45,
    width: 300,
    backgroundColor: Colors.steel,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10
  },
  doubleInput: {
    height: 45,
    width: 300,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  zip: {
    height: 45,
    width: 100,
    backgroundColor: Colors.steel,
    borderRadius: 10,
    paddingLeft: 10
  },
  city: {
    height: 45,
    width: 190,
    backgroundColor: Colors.steel,
    borderRadius: 10,
    paddingLeft: 10
  },
  registerButton: {
    height: 45,
    width: 300,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerText: {
    fontWeight: 'bold',
    color: Colors.white
  }
})
