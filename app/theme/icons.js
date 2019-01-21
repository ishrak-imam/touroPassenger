import React from 'react'
import isIOS from '../utils/isIOS'
import { Ionicons } from '@expo/vector-icons'

const getIconName = name => {
  const icons = {
  }
  const result = icons[name]
  return isIOS ? result[0] : result[1]
}

const IonIcon = (props) => {
  const { name, size = 25, ...rest } = props
  return <Ionicons name={getIconName(name)} size={size} {...rest} />
}

export default IonIcon
