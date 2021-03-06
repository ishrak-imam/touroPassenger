
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import App from './app/modules/app'
import { store, persistor } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'
import { AppLoading } from 'expo'
import cacheAssestsAsync from './app/utils/assetsCache'
import I18n from './app/i18n'
import { MenuProvider } from 'react-native-popup-menu'
import { StatusBar } from 'react-native'

StatusBar.setBarStyle('light-content')

console.disableYellowBox = true

export default class TouroPassenger extends Component {
  constructor () {
    super()
    this.state = {
      isAppReady: false
    }
  }

  componentDidMount () {
    Promise.all([
      I18n.initAsync(),
      this._loadAssetsAsync()
    ]).then(_ => this.setState({
      isAppReady: true
    }))
  }

  async _loadAssetsAsync () {
    try {
      await cacheAssestsAsync({
        images: [],
        fonts: [
          // {
          //   Roboto: require('native-base/Fonts/Roboto.ttf'),
          //   Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
          // }
        ]
      })
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      )
    } finally {
      console.log('Assets cached')
    }
  }

  render () {
    return (
      this.state.isAppReady
        ? <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MenuProvider>
              <App />
            </MenuProvider>
          </PersistGate>
        </Provider>
        : <AppLoading />
    )
  }
}
