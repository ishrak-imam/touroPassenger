
import React, { Component } from 'react'
import {
  View, StyleSheet, Text
} from 'react-native'
import Pager from '../../components/pager'
import ImageCache from '../../components/imageCache'
// import Header from '../../components/header'
import ScrollableTab from '../../components/scrollableTab'
import Booking from '../../components/booking'
import Transport from '../../components/transport'
import NavigationIcon from '../../components/navigationIcon'

export default class TripScreen extends Component {
  _onPageChange = pageNumber => {
    this.scrollableTab._onTabSelect(pageNumber)()
  }

  _onTabSwitch = pageNumber => {
    this.pager._slideTo(pageNumber)
  }

  _renderNavigationIcon = () => {
    const { navigation } = this.props
    const navigationIcon = navigation.getParam('navigationIcon')
    return (
      <NavigationIcon icon={navigationIcon} navigation={navigation} />
    )
  }

  render () {
    return (

      <View style={ss.screen}>
        {/* <Header icon='menu' title='Home' navigation={navigation} /> */}

        {this._renderNavigationIcon()}

        <Pager style={{ height: 250 }} minimap applyGradient>
          <ImageCache uri={'https://picsum.photos/500/300?image=1081'} style={ss.image} />
          <ImageCache uri={'https://picsum.photos/500/300?image=1076'} style={ss.image} />
          <ImageCache uri={'https://picsum.photos/500/300?image=1068'} style={ss.image} />
          <ImageCache uri={'https://picsum.photos/500/300?image=1052'} style={ss.image} />
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
            <Booking />
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
  screen: {
    flex: 1
  },
  image: {
    height: 300,
    width: null
  }
})
