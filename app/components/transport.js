
import React, { Component } from 'react'
import {
  View, Text, StyleSheet, ScrollView
} from 'react-native'
import { Colors, IonIcon } from '../theme'

const TOP_DOT_MARGIN = 30 // dot at start
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
          {this._eventDot('topBigDot')}
          {this._eventLine('topBigDotLine')}
        </View>

        <View style={ss.right}>
          <Text>Thursday, 28 February</Text>
          <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>08:10, Oresundsterminalen, Arlov</Text>

          <Text>Platform 4</Text>
          <Text>Buss XYZ 123</Text>
          <Text>Chauffor: Nisse Andersson</Text>
        </View>

      </View>
    )
  }

  _event = event => {
    return (
      <View style={ss.event}>

        <View style={ss.left}>
          {this._eventDot('smallDot')}
          {this._eventLine('smallDotLine')}
        </View>

        <View style={ss.right}>
          <Text style={{ fontWeight: 'bold' }}>{event.title}</Text>
          <Text>{event.subtitle}</Text>
        </View>

      </View>
    )
  }

  _bottomEvent = event => {
    return (
      <View style={ss.event}>

        <View style={ss.bottomLeft}>
          {this._eventLine('bottomBigDotLine')}
          {this._eventDot('bottomBigDot')}
        </View>

        <View style={ss.bottomRight}>
          <View style={ss.arrival}>
            <Text style={{ fontWeight: 'bold' }}>{event.title}</Text>
            <Text>{event.subtitle}</Text>
          </View>
          <View style={ss.weather}>
            <IonIcon name='temperature' />
            <Text style={ss.temprature}>8</Text>
            <IonIcon style={ss.degree} name='radioOff' size={7} />
            <Text style={ss.unit}>C</Text>
          </View>
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
        {this._event({ title: '09:45, Farjeoverfart', subtitle: 'Rodby - Putgarden' })}
        {this._event({ title: '12:00, Der Alte Kase', subtitle: 'Lunch, observera att tiden kan variera lite' })}
        {this._bottomEvent({ title: '18:00 Berlin, Ivbergs Premium', subtitle: 'Cirkatid' })}

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
  topBigDot: {
    height: BIG_DOT_DIAMETER,
    width: BIG_DOT_DIAMETER,
    borderRadius: BIG_DOT_DIAMETER / 2,
    backgroundColor: Colors.blue,
    marginTop: TOP_DOT_MARGIN // dot at start
  },
  bottomBigDot: {
    height: BIG_DOT_DIAMETER,
    width: BIG_DOT_DIAMETER,
    borderRadius: BIG_DOT_DIAMETER / 2,
    backgroundColor: Colors.blue
  },
  topBigDotLine: {
    // height: (TOP_EVENT_HEIGHT - BIG_DOT_DIAMETER) / 2,
    height: TOP_EVENT_HEIGHT - TOP_DOT_MARGIN,
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
    justifyContent: 'flex-start', // dot at start
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
  },
  bottomRight: {
    flex: 6,
    flexDirection: 'row'
  },
  arrival: {
    flex: 4,
    justifyContent: 'center'
  },
  weather: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  temprature: {
    fontSize: 18,
    marginLeft: 5
  },
  degree: {
    marginTop: -7
  },
  unit: {
    fontSize: 18
  }
})
