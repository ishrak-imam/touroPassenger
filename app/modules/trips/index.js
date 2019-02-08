
import React, { Component } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native'
import StatusBar from '../../components/statusBar'

export default class TripsScreen extends Component {
  _toTrip = () => {
    const { navigation } = this.props
    const navigationIcon = navigation.getParam('navigationIcon')
    navigation.navigate('Trip', { navigationIcon })
  }

  render () {
    return (
      <View style={ss.screen}>
        <StatusBar />
        <View style={ss.content}>
          <TouchableOpacity onPress={this._toTrip}>
            <Text>Go to trip</Text>
          </TouchableOpacity>
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
