
import React, { Component } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native'
import { actionDispatcher } from '../../utils/actionDispatcher'
import { logoutReq } from '../auth/action'
import Pager from '../../components/pager'
import ImageCache from '../../components/imageCache'

export default class HomeScreen extends Component {
  _logOut = () => {
    actionDispatcher(logoutReq())
  }

  render () {
    return (
      <View style={ss.container}>

        <View style={{ flex: 2 }}>
          <Pager style={{ marginTop: 50 }} miniMap autoplay>
            <ImageCache uri={'https://picsum.photos/500/300?image=2'} style={ss.image} />
            <ImageCache uri={'https://picsum.photos/500/300?image=3'} style={ss.image} />
            <ImageCache uri={'https://picsum.photos/500/300?image=4'} style={ss.image} />
            <ImageCache uri={'https://picsum.photos/500/300?image=5'} style={ss.image} />
          </Pager>
        </View>

        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={this._logOut}>
            <Text>L O G O U T</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const ss = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: 300,
    width: null
  }
})
