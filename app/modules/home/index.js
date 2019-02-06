
import React, { Component } from 'react'
import {
  View, StyleSheet, Text
} from 'react-native'
import Pager from '../../components/pager'
import ImageCache from '../../components/imageCache'
// import Header from '../../components/header'
import ScrollableTab from '../../components/scrollableTab'
import Transport from '../../components/transport'
import StatusBar from '../../components/statusBar'

export default class HomeScreen extends Component {
  _onPageChange = pageNumber => {
    this.scrollableTab._onTabSelect(pageNumber)()
  }

  _onTabSwitch = pageNumber => {
    this.pager._slideTo(pageNumber)
  }

  render () {
    // const { navigation } = this.props
    return (
      <View style={ss.container}>
        {/* <Header icon='menu' title='Home' navigation={navigation} /> */}

        <StatusBar backgroundColor='rgba(0,0,0,0.9)' />

        <Pager style={{ height: 200 }} minimap autoplay>
          <ImageCache uri={'https://picsum.photos/500/300?image=2'} style={ss.image} />
          <ImageCache uri={'https://picsum.photos/500/300?image=3'} style={ss.image} />
          <ImageCache uri={'https://picsum.photos/500/300?image=4'} style={ss.image} />
          <ImageCache uri={'https://picsum.photos/500/300?image=5'} style={ss.image} />
        </Pager>

        <ScrollableTab
          onRef={ref => (this.scrollableTab = ref)}
          onTabSwitch={this._onTabSwitch}
        />

        <Pager
          style={{ flex: 1 }}
          onPageChange={this._onPageChange}
          onRef={ref => (this.pager = ref)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Booking</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Transport />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hotel</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Excursion</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Contact</Text>
          </View>
        </Pager>

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
