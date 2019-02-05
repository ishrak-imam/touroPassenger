
import React, { PureComponent } from 'react'
import {
  Animated, ScrollView,
  StyleSheet, View
} from 'react-native'
import { width } from '../utils/windowSize'
import { Colors } from '../theme'

export default class Pager extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      currentPage: 1,
      scrollOffset: 0,
      direction: '>'
    }

    this._autoPlay = null
    this._minimap = new Animated.Value(0)
  }

  componentDidMount () {
    this._setRef(this)
    const { autoplay, children } = this.props
    if (autoplay && children.length) this._startAutoPlay()
  }

  componentWillUnmount () {
    this._setRef(undefined)
    if (this._autoPlay) clearInterval(this._autoPlay)
  }

  _setRef = ref => {
    const { onRef } = this.props
    if (onRef) onRef(ref)
  }

  _getPages = () => {
    const { children } = this.props
    return React.Children.map(children, child => {
      return child
        ? <View style={ss.child}>{child}</View>
        : null
    })
  }

  _renderMinimap = () => {
    const { children } = this.props
    if (!children) return null

    let miniMap = null
    if (!children.length) miniMap = <Animated.View style={ss.dots} />
    if (children.length) {
      const position = Animated.divide(this._minimap, width)
      miniMap = children.map((_, i) => {
        const opacity = position.interpolate({
          inputRange: [i - 1, i, i + 1],
          outputRange: [0.25, 1, 0.25],
          extrapolate: 'clamp'
        })
        return <Animated.View key={i} style={[ss.dots, { opacity }]} />
      })
    }

    return (
      <View style={ss.minimap}>
        {miniMap}
      </View>
    )
  }

  _startAutoPlay = () => {
    this._autoPlay = setInterval(this._slide, 2000)
  }

  _slide = () => {
    const { children } = this.props
    let direction = this.state.direction
    let scrollOffset = this.state.scrollOffset
    let currentPage = this.state.currentPage

    if (currentPage === 1) direction = '>'
    if (currentPage === children.length) direction = '<'

    currentPage = (direction === '>') ? currentPage + 1 : currentPage - 1
    const x = direction === '>' ? (scrollOffset + width) : (scrollOffset - width)
    this.pager.scrollTo({ x, animated: true })
    this.setState({
      currentPage,
      scrollOffset: x,
      direction
    })
  }

  _slideTo = page => {
    const { currentPage, scrollOffset } = this.state

    const diff = page - currentPage
    const x = scrollOffset + (diff * width)
    this.pager.scrollTo({ x, animated: true })
    this.setState({
      currentPage: currentPage + diff,
      scrollOffset: x
    })
  }

  _onScroll = () => {
    if (!this.props.miniMap) return
    return Animated.event([{
      nativeEvent: {
        contentOffset: {
          x: this._minimap
        }
      }
    }])
  }

  _handlePageChange = event => {
    const { onPageChange } = this.props
    const offset = event.nativeEvent.contentOffset
    if (offset) {
      const page = Math.round(offset.x / width)
      if (onPageChange) onPageChange(page)
    }
  }

  render () {
    const { style, miniMap, autoplay } = this.props
    return (
      <View style={style}>
        <ScrollView
          ref={ref => { this.pager = ref }}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={this._onScroll()}
          scrollEventThrottle={16}
          scrollEnabled={!autoplay}
          onMomentumScrollEnd={this._handlePageChange}
        >
          {this._getPages()}
        </ScrollView>
        {miniMap && this._renderMinimap()}
      </View>
    )
  }
}

const ss = StyleSheet.create({
  itemsContainer: {
    flex: 5
  },
  child: {
    flex: 1,
    width,
    overflow: 'hidden'
  },
  minimap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -20
  },
  dots: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: Colors.white,
    position: 'relative',
    margin: 5,
    shadowColor: Colors.charcoal,
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 }
  }
})
