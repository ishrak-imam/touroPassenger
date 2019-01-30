
import React, { Component } from 'react'
import {
  View, StyleSheet
} from 'react-native'
import Pager from '../../components/pager'
import ImageCache from '../../components/imageCache'
import Header from '../../components/header'

export default class HomeScreen extends Component {
  render () {
    const { navigation } = this.props
    return (
      <View style={ss.container}>
        <Header icon='menu' title='Home' navigation={navigation} />

        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Pager miniMap autoplay>
            <ImageCache uri={'https://picsum.photos/500/300?image=2'} style={ss.image} />
            <ImageCache uri={'https://picsum.photos/500/300?image=3'} style={ss.image} />
            <ImageCache uri={'https://picsum.photos/500/300?image=4'} style={ss.image} />
            <ImageCache uri={'https://picsum.photos/500/300?image=5'} style={ss.image} />
          </Pager>
        </View>

        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }} />

      </View>
    )
  }
}

const ss = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: 300,
    width: null
  }
})
