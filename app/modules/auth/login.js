
import React, { Component } from 'react'
import {
  View, Text, StyleSheet,
  TouchableOpacity
} from 'react-native'
import { networkActionDispatcher } from '../../utils/actionDispatcher'
import { loginReq } from './action'

export default class LoginScreen extends Component {
  _login = () => {
    networkActionDispatcher(loginReq({
      user: 'ishrak',
      password: 'password'
    }))
  }

  render () {
    return (
      <View style={ss.container}>
        <TouchableOpacity onPress={this._login}>
          <Text>L O G I N</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const ss = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
