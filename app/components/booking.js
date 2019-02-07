
import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { actionDispatcher } from '../utils/actionDispatcher'
import { logoutReq } from '../modules/auth/action'

export default class Booking extends Component {
  _logOut = () => {
    actionDispatcher(logoutReq())
  }

  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={this._logOut}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
