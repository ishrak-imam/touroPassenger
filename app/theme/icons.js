import React from 'react'
import isIOS from '../utils/isIOS'
import { Ionicons } from '@expo/vector-icons'

const getIconName = name => {
  const icons = {
    check: ['ios-checkmark', 'md-checkmark'],
    close: ['ios-close', 'md-close'],
    circleCheck: ['ios-checkmark-circle-outline', 'md-checkmark-circle-outline'],
    circleClose: ['ios-close-circle-outline', 'md-close-circle-outline'],
    back: ['ios-arrow-back', 'md-arrow-back'],
    menu: ['ios-menu', 'md-menu'],
    logOut: ['ios-log-out', 'md-log-out']
  }
  const result = icons[name]
  return isIOS ? result[0] : result[1]
}

const IonIcon = (props) => {
  const { name, size = 25, ...rest } = props
  return <Ionicons name={getIconName(name)} size={size} {...rest} />
}

export default IonIcon
