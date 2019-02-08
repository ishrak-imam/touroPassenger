
import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Keyboard } from 'react-native'
import { IonIcon, Colors } from '../theme'
import isIphoneX from '../utils/isIphoneX'

export default class NavigationIcon extends Component {
  _onPress = type => {
    const { navigation } = this.props
    return () => {
      Keyboard.dismiss()
      switch (type) {
        case 'menu':
          navigation.openDrawer()
          break
        case 'back':
          navigation.goBack()
          break
      }
    }
  }

  render () {
    const { icon } = this.props
    return (
      <TouchableOpacity style={ss.hamburger} onPress={this._onPress(icon)}>
        <IonIcon name={icon} color={Colors.white} />
      </TouchableOpacity>
    )
  }
}

const ss = StyleSheet.create({
  hamburger: {
    position: 'absolute',
    top: isIphoneX ? 40 : 30,
    left: 10,
    paddingHorizontal: 5,
    zIndex: 1
  }
})
