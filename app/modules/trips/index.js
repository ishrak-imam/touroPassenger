
import React, { Component } from 'react'
import {
  View, Text, StyleSheet
} from 'react-native'
import StatusBar from '../../components/statusBar'

export default class TripsScreen extends Component {
  render () {
    return (
      <View style={ss.screen}>
        <StatusBar />
        <View style={ss.content}>
          <Text>Trips</Text>
        </View>
      </View>
    )
  }
}

const ss = StyleSheet.create({
  screen: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
