
import React, { Component } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import isIphoneX from '../utils/isIphoneX'
import isIOS from '../utils/isIOS'
import { Colors } from '../theme'

const STATUS_BAR_HEIGHT = isIphoneX ? 35 : isIOS ? 20 : StatusBar.currentHeight

export default class TouroStatusBar extends Component {
  static defaultProps = {
    backgroundColor: Colors.blue,
    barStyle: 'light-content'
  }

  render () {
    const { backgroundColor, barStyle } = this.props
    return (
      <View style={[ss.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} barStyle={barStyle} />
      </View>
    )
  }
}

const ss = StyleSheet.create({
  statusBar: {
    height: STATUS_BAR_HEIGHT
  }
})
