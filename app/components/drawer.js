
import React, { Component } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native'
import { Colors, IonIcon } from '../theme'
import { actionDispatcher } from '../utils/actionDispatcher'
import { logoutReq } from '../modules/auth/action'

export default class Drawer extends Component {
  _logOut = () => {
    actionDispatcher(logoutReq())
  }

  render () {
    return (
      <View style={ss.container}>

        <View style={ss.header}>
          <Text>H E A D E R</Text>
        </View>

        <View style={ss.body}>
          <Text>B O D Y</Text>
        </View>

        <View style={ss.footer}>
          <TouchableOpacity style={ss.logout} onPress={this._logOut}>
            <IonIcon name='logOut' size={25} />
            <Text style={ss.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const ss = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue
  },
  body: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderColor: Colors.charcoal
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 20
  }
})
