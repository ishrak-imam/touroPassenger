
import React, { Component } from 'react'
import {
  View, StyleSheet, Text, Animated
} from 'react-native'
import { Colors, IonIcon } from '../theme'
import { width, height } from '../utils/windowSize'
import isIphoneX from '../utils/isIphoneX'
import { connect } from 'react-redux'
import { getNotification } from '../selectors'
import { actionDispatcher } from '../utils/actionDispatcher'
import { clearNotification } from './action'

class Notification extends Component {
  static defaultProps = {
    width: width - (isIphoneX ? 120 : 150),
    height: height - (isIphoneX ? 650 : 540)
  }

  constructor (props) {
    super(props)
    this.state = {
      opacity: new Animated.Value(0)
    }
  }

  componentDidMount () {
    this._callAnimate(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this._callAnimate(nextProps)
  }

  _callAnimate = (props) => {
    const { notification } = props
    if (notification.size) {
      this.animate(notification.get('duration'))
    }
  }

  animate = (duration = 2000) => {
    const { opacity } = this.state
    opacity.setValue(0)
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true
    }).start(() => {
      actionDispatcher(clearNotification())
    })
  }

  render () {
    const { width, height, notification } = this.props
    const { opacity } = this.state

    if (!notification.size) return null

    const anim = {
      opacity: opacity.interpolate({
        inputRange: [0, 0.05, 0.85, 1],
        outputRange: [0, 1, 1, 0]
      }),
      transform: [{
        scale: opacity.interpolate({
          inputRange: [0, 0.02, 0.9, 1],
          outputRange: [0.5, 1, 1, 0.5]
        })
      }]
    }

    let icon = 'circleCheck'
    let color = Colors.green
    if (notification.get('type') === 'ERROR') {
      icon = 'circleClose'
      color = Colors.fire
    }

    return (
      <View style={ss.container}>
        <Animated.View style={[ss.box, { width, height }, anim]}>
          <IonIcon name={icon} color={color} size={40} />
          <Text style={ss.text}>{notification.get('message')}</Text>
        </Animated.View>
      </View>
    )
  }
}

const stateToProps = state => ({
  notification: getNotification(state)
})

export default connect(stateToProps, null)(Notification)

const ss = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    paddingTop: 30
  },
  text: {
    fontWeight: '400',
    color: Colors.white,
    marginTop: 10,
    textAlign: 'center'
  }
})
