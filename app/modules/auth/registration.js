
import React, { Component } from 'react'
import {
  View, StyleSheet, TextInput,
  TouchableOpacity, Text, ActivityIndicator
} from 'react-native'
import { Colors } from '../../theme'
import Header from '../../components/header'
import Translator from '../../utils/translator'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { checkSSN, checkZip, checkEmail } from '../../utils/stringHelpers'
import { ssnDataReq, clearSSNData } from './action'
import { actionDispatcher, networkActionDispatcher } from '../../utils/actionDispatcher'
import { connect } from 'react-redux'
import { getLogin } from '../../selectors'
import debounce from '../../utils/debounce'
import CheckBox from '../../components/checkBox'

const _T = Translator('Auth')

class Registration extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoyalty: false,
      isValidSSN: false,
      ssn: '',
      FirstName: '',
      LastName: '',
      Address: '',
      Zip: '',
      City: '',
      Email: ''
    }
    this._checkSSNDebounce = debounce(this._checkSSN, 200)
    this._clearSSNData()
  }

  get isDisabled () {
    const { login } = this.props
    const isLoading = login.get('isLoading')
    const {
      isLoyalty, isValidSSN, FirstName, LastName,
      Address, Zip, City, Email
    } = this.state

    if (isLoyalty) return (!isValidSSN || isLoading)

    return !(FirstName && LastName && Address && checkZip(Zip) && City && checkEmail(Email))
  }

  componentWillReceiveProps (nextProps) {
    const { login } = nextProps
    this._resolveSSNData(login.get('ssnData'))
  }

  _resolveSSNData = data => {
    const ssnData = {
      FirstName: data.get('FirstName'),
      LastName: data.get('LastName'),
      Address: data.get('Address'),
      Zip: data.get('Zip'),
      City: data.get('City'),
      Email: data.get('Email')
    }
    this.setState(ssnData)
  }

  _clearSSNData = () => {
    actionDispatcher(clearSSNData())
  }

  _handleChange = field => text => {
    this.setState({ [field]: text }, () => {
      if (field === 'ssn') this._checkSSNDebounce()
    })
  }

  _loyaltyToggle = () => {
    this.setState({ isLoyalty: !this.state.isLoyalty })
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
    const {
      isLoyalty, isValidSSN,
      ssn, FirstName, LastName, Address, City, Zip, Email
    } = this.state
    const isLoading = login.get('isLoading')
    const backgroundColor = this.isDisabled ? Colors.buttonDisable : Colors.blue

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
            keyboardType='numeric'
          />

          <View style={ss.loyalityElement}>
            <TouchableOpacity style={ss.loyaltyCheck} onPress={this._loyaltyToggle}>
              <CheckBox checked={isLoyalty} />
              <Text style={ss.loyaltyText}>Loyalty member</Text>
            </TouchableOpacity>
            <View style={ss.exTextContainer}>
              <Text style={ss.exText}>SSN is mandatory to register as a loyalty program member.</Text>
            </View>
          </View>

          <TextInput
            style={ss.inputElements}
            onChangeText={this._handleChange('FirstName')}
            placeholder='First name'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            placeholderTextColor={Colors.charcoal}
            value={FirstName}
            editable={!isLoading}
          />

          <TextInput
            style={ss.inputElements}
            onChangeText={this._handleChange('LastName')}
            placeholder='Last name'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            placeholderTextColor={Colors.charcoal}
            value={LastName}
            editable={!isLoading}
          />

          <TextInput
            style={ss.inputElements}
            onChangeText={this._handleChange('Address')}
            placeholder='Address'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            placeholderTextColor={Colors.charcoal}
            value={Address}
            editable={!isLoading}
          />

          <View style={ss.doubleInput}>

            <TextInput
              style={ss.zip}
              onChangeText={this._handleChange('Zip')}
              placeholder='Zip'
              autoCapitalize='none'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              placeholderTextColor={Colors.charcoal}
              value={Zip}
              editable={!isLoading}
              keyboardType='numeric'
            />

            <TextInput
              style={ss.city}
              onChangeText={this._handleChange('City')}
              placeholder='City'
              autoCapitalize='none'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              placeholderTextColor={Colors.charcoal}
              value={City}
              editable={!isLoading}
            />

          </View>

          <TextInput
            style={ss.inputElements}
            onChangeText={this._handleChange('Email')}
            placeholder='Email'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            placeholderTextColor={Colors.charcoal}
            keyboardType='email-address'
            value={Email}
            editable={!isLoading}
          />

          <TouchableOpacity style={[ss.registerButton, { backgroundColor }]} disabled={this.isDisabled} onPress={() => {}}>
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

  loyalityElement: {
    height: 80,
    width: 300,
    // backgroundColor: Colors.steel,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10
  },
  loyaltyCheck: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  loyaltyText: {
    fontSize: 15,
    marginLeft: 10
  },
  exTextContainer: {
    flex: 1.3,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  exText: {
    fontStyle: 'italic',
    color: Colors.grey
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
