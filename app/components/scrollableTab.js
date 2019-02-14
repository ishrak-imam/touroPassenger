
import React, { Component } from 'react'
import {
  View, ScrollView, StyleSheet,
  Text, TouchableOpacity
} from 'react-native'
import { Colors } from '../theme'
import { width } from '../utils/windowSize'
import Translator from '../utils/translator'

const _T = Translator('ScrollableTab')

const MENU_ITEMS = [
  'booking', 'transport', 'hotel', 'excursion', 'contact'
]

const MENU_STRIP_HEIGHT = 45
const ITEM_WIDTH = 150
const SCROLL_LIMIT_RIGHT = Math.round((MENU_ITEMS.length * ITEM_WIDTH) - width)
const SCROLL_LIMIT_LEFT = 0

export default class ScrollableTab extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 0,
      scrollOffsetX: 0
    }
  }

  componentDidMount () {
    this._setRef(this)
  }

  componentWillUnmount () {
    this._setRef(undefined)
  }

  _setRef = ref => {
    const { onRef } = this.props
    if (onRef) onRef(ref)
  }

  _onTabSelect = selected => () => {
    this.setState({ selected })
    this._scroll(selected + 1)
    const { onTabSwitch } = this.props
    if (onTabSwitch) onTabSwitch(selected + 1)
  }

  _scroll = itemIndex => {
    const { selected, scrollOffsetX } = this.state

    if (itemIndex === selected + 1) return

    if (itemIndex > selected + 1) {
      const ITEM_IN_VIEWPORT = (ITEM_WIDTH * itemIndex) - scrollOffsetX
      if (ITEM_IN_VIEWPORT > width && scrollOffsetX < SCROLL_LIMIT_RIGHT) {
        let scrollTo = scrollOffsetX + ITEM_WIDTH
        if (scrollTo > SCROLL_LIMIT_RIGHT) scrollTo = SCROLL_LIMIT_RIGHT
        this.scrollableTab.scrollTo({ x: scrollTo, animated: true })
      }
    }

    if (itemIndex < selected + 1) {
      const ITEM_IN_VIEWPORT = (((MENU_ITEMS.length - itemIndex) + 1) * ITEM_WIDTH) - (SCROLL_LIMIT_RIGHT - scrollOffsetX)
      if (ITEM_IN_VIEWPORT > width && scrollOffsetX > SCROLL_LIMIT_LEFT) {
        let scrollTo = scrollOffsetX - ITEM_WIDTH
        if (scrollTo < SCROLL_LIMIT_LEFT) scrollTo = SCROLL_LIMIT_LEFT
        this.scrollableTab.scrollTo({ x: scrollTo, animated: true })
      }
    }
  }

  _renderMenuItems = () => {
    const { selected } = this.state
    return MENU_ITEMS.map((item, index) => {
      return (
        <View style={ss.menuItem} key={index}>
          <TouchableOpacity style={ss.menuTextCon} onPress={this._onTabSelect(index)}>
            <Text style={ss.menuText}>{_T(item)}</Text>
          </TouchableOpacity>
          <View style={ss.selectedCon}>
            {
              (selected === index) &&
              <View style={ss.selected} />
            }
          </View>
        </View>
      )
    })
  }

  _onScroll = event => {
    const scrollOffsetX = Math.round(event.nativeEvent.contentOffset.x)
    this.setState({ scrollOffsetX })
  }

  render () {
    let { backgroundColor } = this.props
    backgroundColor = backgroundColor || Colors.blue

    return (
      <View style={ss.container}>
        <ScrollView
          bounces={false}
          ref={ref => { this.scrollableTab = ref }}
          horizontal
          contentContainerStyle={[ss.scrollView, { backgroundColor }]}
          onScroll={this._onScroll}
          showsHorizontalScrollIndicator={false}
        >
          {this._renderMenuItems()}
        </ScrollView>
      </View>
    )
  }
}

const ss = StyleSheet.create({
  container: {
    height: MENU_STRIP_HEIGHT
  },
  scrollView: {
    height: MENU_STRIP_HEIGHT
  },
  menuItem: {
    height: MENU_STRIP_HEIGHT,
    width: ITEM_WIDTH
  },
  menuTextCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white
  },
  selectedCon: {
    height: 4,
    width: '100%',
    marginBottom: 1
  },
  selected: {
    flex: 1,
    backgroundColor: Colors.white
  }
})
