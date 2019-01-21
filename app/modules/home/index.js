
import React, { Component } from 'react'
import {
  View, Text, StyleSheet,
  TouchableOpacity
} from 'react-native'
import { actionDispatcher } from '../../utils/actionDispatcher'
import { logoutReq } from '../auth/action'

export default class HomeScreen extends Component {
  _logOut = () => {
    actionDispatcher(logoutReq())
  }

  render () {
    return (
      <View style={ss.container}>
        <TouchableOpacity onPress={this._logOut}>
          <Text>L O G O U T</Text>
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
