
import React, { Component } from 'react'
import {
  View, Text, StyleSheet, ScrollView
} from 'react-native'
import { Colors } from '../theme'

const TOP_EVENT_HEIGHT = 130
const EVENT_HEIGHT = 70
const BIG_DOT_DIAMETER = 20
const SMALL_DOT_DIAMETER = 10

class TransportItem extends Component {
  _eventDot = style => {
    return (
      <View style={ss[style]} />
    )
  }

  _eventLine = style => {
    return (
      <View style={ss[style]} />
    )
  }

  _topEvent = () => {
    return (
      <View style={ss.topEvent}>

        <View style={ss.topLeft}>
          {this._eventDot('bigDot')}
          {this._eventLine('topBigDotLine')}
        </View>

        <View style={ss.right}>
          <View style={{ width: 300, height: 20, backgroundColor: Colors.steel, marginBottom: 5 }} />
          <View style={{ width: 300, height: 20, backgroundColor: Colors.steel, marginBottom: 5 }} />
          <View style={{ width: 200, height: 20, backgroundColor: Colors.steel, marginBottom: 5 }} />
          <View style={{ width: 200, height: 20, backgroundColor: Colors.steel, marginBottom: 5 }} />
        </View>

      </View>
    )
  }

  _event = () => {
    return (
      <View style={ss.event}>

        <View style={ss.left}>
          {this._eventDot('smallDot')}
          {this._eventLine('smallDotLine')}
        </View>

        <View style={ss.right}>
          <View style={{ width: 300, height: 20, backgroundColor: Colors.steel, marginBottom: 5 }} />
          <View style={{ width: 200, height: 20, backgroundColor: Colors.steel, marginBottom: 5 }} />
        </View>

      </View>
    )
  }

  _bottomEvent = () => {
    return (
      <View style={ss.event}>

        <View style={ss.bottomLeft}>
          {this._eventLine('bottomBigDotLine')}
          {this._eventDot('bigDot')}
        </View>

        <View style={ss.right}>
          <View style={{ width: 300, height: 20, backgroundColor: Colors.steel, marginBottom: 5 }} />
          <View style={{ width: 200, height: 20, backgroundColor: Colors.steel, marginBottom: 5 }} />
        </View>

      </View>
    )
  }

  render () {
    return (
      <View style={ss.item}>

        <View style={ss.header}>
          <Text style={ss.headerText}>OUT</Text>
        </View>

        {this._topEvent()}
        {this._event()}
        {this._event()}
        {this._bottomEvent()}

      </View>
    )
  }
}

export default class Transport extends Component {
  render () {
    return (
      <View style={ss.container}>

        <ScrollView contentContainerStyle={ss.scrollView}>

          <TransportItem />
          <TransportItem />

        </ScrollView>
      </View>
    )
  }
}

const ss = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    paddingBottom: 20
  },
  item: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: Colors.steel,
    marginHorizontal: 10
  },
  header: {
    height: 30,
    justifyContent: 'center',
    marginLeft: 10
  },
  headerText: {
    fontWeight: 'bold'
  },
  bigDot: {
    height: BIG_DOT_DIAMETER,
    width: BIG_DOT_DIAMETER,
    borderRadius: BIG_DOT_DIAMETER / 2,
    backgroundColor: Colors.blue
  },
  topBigDotLine: {
    height: (TOP_EVENT_HEIGHT - BIG_DOT_DIAMETER) / 2,
    width: 2,
    backgroundColor: Colors.blue
  },
  bottomBigDotLine: {
    height: (EVENT_HEIGHT - BIG_DOT_DIAMETER) / 2,
    width: 2,
    backgroundColor: Colors.blue
  },
  smallDot: {
    height: SMALL_DOT_DIAMETER,
    width: SMALL_DOT_DIAMETER,
    borderRadius: SMALL_DOT_DIAMETER / 2,
    backgroundColor: Colors.blue,
    position: 'relative',
    top: EVENT_HEIGHT / 2
  },
  smallDotLine: {
    height: EVENT_HEIGHT,
    width: 2,
    backgroundColor: Colors.blue,
    position: 'relative',
    top: -(SMALL_DOT_DIAMETER / 2)
  },
  topEvent: {
    height: TOP_EVENT_HEIGHT,
    flexDirection: 'row'
  },
  event: {
    height: EVENT_HEIGHT,
    flexDirection: 'row'
  },
  topLeft: {
    flex: 0.7,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  left: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomLeft: {
    flex: 0.7,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  right: {
    flex: 6,
    justifyContent: 'center'
  }
})
