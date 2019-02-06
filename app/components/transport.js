
import React, { Component } from 'react'
import {
  View, Text, StyleSheet, ScrollView
} from 'react-native'
import { Colors } from '../theme'

export default class Transport extends Component {
  _circle = () => {
    return (
      <View style={ss.circle} />
    )
  }

  render () {
    return (
      <View style={ss.container}>

        <ScrollView contentContainerStyle={ss.scrollView}>

          <View style={ss.item}>
            <View style={ss.header}>
              <Text style={ss.boldText}>OUT</Text>
            </View>

            <View style={ss.body}>

              <View style={{ flex: 0.7 }}>
                <View style={[ss.circleCon, { justifyContent: 'flex-end' }]}>
                  {this._circle()}
                </View>
                <View style={ss.lineCon}>
                  <View style={ss.line} />
                </View>
                <View style={[ss.circleCon, { justifyContent: 'flex-start' }]}>
                  {this._circle()}
                </View>
              </View>

              <View style={{ flex: 5 }}>

                <View style={{ flex: 2, justifyContent: 'center' }}>
                  <View style={{ height: 20, width: 300, backgroundColor: Colors.steel, marginBottom: 5 }} />
                  <View style={{ height: 20, width: 200, backgroundColor: Colors.steel, marginBottom: 5 }} />
                  <View style={{ height: 20, width: 300, backgroundColor: Colors.steel, marginBottom: 5 }} />
                  <View style={{ height: 20, width: 200, backgroundColor: Colors.steel, marginBottom: 5 }} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <View style={{ height: 20, width: 300, backgroundColor: Colors.steel, marginBottom: 5 }} />
                  <View style={{ height: 20, width: 200, backgroundColor: Colors.steel }} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <View style={{ height: 20, width: 300, backgroundColor: Colors.steel, marginBottom: 5 }} />
                  <View style={{ height: 20, width: 200, backgroundColor: Colors.steel }} />
                </View>
                <View style={{ flex: 1 }} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <View style={{ height: 20, width: 300, backgroundColor: Colors.steel, marginBottom: 5 }} />
                  <View style={{ height: 20, width: 200, backgroundColor: Colors.steel }} />
                </View>

              </View>

            </View>

          </View>

          <View style={ss.item}>
            <View style={ss.header}>
              <Text style={ss.boldText}>HOME</Text>
            </View>

            <View style={ss.body}>

              <View style={{ flex: 0.7 }}>
                <View style={[ss.circleCon, { justifyContent: 'flex-end' }]}>
                  {this._circle()}
                </View>
                <View style={ss.lineCon}>
                  <View style={ss.line} />
                </View>
                <View style={[ss.circleCon, { justifyContent: 'flex-start' }]}>
                  {this._circle()}
                </View>
              </View>

              <View style={{ flex: 5 }}>

                <View style={{ flex: 2, justifyContent: 'center' }}>
                  <View style={{ height: 20, width: 300, backgroundColor: Colors.steel, marginBottom: 5 }} />
                  <View style={{ height: 20, width: 200, backgroundColor: Colors.steel, marginBottom: 5 }} />
                  <View style={{ height: 20, width: 300, backgroundColor: Colors.steel, marginBottom: 5 }} />
                  <View style={{ height: 20, width: 200, backgroundColor: Colors.steel, marginBottom: 5 }} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <View style={{ height: 20, width: 300, backgroundColor: Colors.steel, marginBottom: 5 }} />
                  <View style={{ height: 20, width: 200, backgroundColor: Colors.steel }} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <View style={{ height: 20, width: 300, backgroundColor: Colors.steel, marginBottom: 5 }} />
                  <View style={{ height: 20, width: 200, backgroundColor: Colors.steel }} />
                </View>
                <View style={{ flex: 1 }} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <View style={{ height: 20, width: 300, backgroundColor: Colors.steel, marginBottom: 5 }} />
                  <View style={{ height: 20, width: 200, backgroundColor: Colors.steel }} />
                </View>

              </View>

            </View>

          </View>

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
    height: 400,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: Colors.steel,
    marginHorizontal: 10
  },
  header: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  boldText: {
    fontWeight: 'bold'
  },
  body: {
    flex: 6,
    flexDirection: 'row',
    paddingBottom: 10
  },
  circleCon: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 10
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: Colors.blue
  },
  lineCon: {
    flex: 6,
    alignItems: 'flex-end',
    marginRight: 10
  },
  line: {
    flex: 1,
    marginRight: 9,
    width: 2,
    backgroundColor: Colors.blue
  }
})
