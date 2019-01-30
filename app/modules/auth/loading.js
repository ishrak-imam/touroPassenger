
import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import isIOS from '../../utils/isIOS'
import { connect } from 'react-redux'
import { init } from '../auth/action'
import { Colors } from '../../theme'
import { startConnectionMonitor, checkConnection } from '../../connection/action'
import { createCacheDir } from '../../components/imageCache/action'
import { startAppStateMonitor } from '../../modules/app/action'

class Loading extends Component {
  componentDidMount () {
    if (!isIOS) this.props.dispatch(checkConnection())
    this.props.dispatch(createCacheDir())
    this.props.dispatch(startConnectionMonitor())
    this.props.dispatch(startAppStateMonitor())
    this.props.dispatch(init())
  }
  render () {
    return (
      <View style={ss.container}>
        <ActivityIndicator size='large' color={Colors.white} />
      </View>
    )
  }
}

export default connect(null, dispatch => ({ dispatch }))(Loading)

const ss = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue
  }
})
