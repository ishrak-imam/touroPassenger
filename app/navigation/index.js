import React from 'react'

import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation'

import Drawer from '../components/drawer'

import Loading from '../modules/auth/loading'
import Login from '../modules/auth/login'
import Registration from '../modules/auth/registration'
import TripScreen from '../modules/trip'
import TripsScreen from '../modules/trips'

const authStack = createStackNavigator(
  {
    Login: { screen: Login },
    Registration: { screen: Registration }
  },
  {
    initialRouteName: 'Login',
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
)

const appStack = createStackNavigator(
  {
    Trips: { screen: TripsScreen },
    Trip: { screen: TripScreen }
  },
  {
    initialRouteName: 'Trips',
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
)

const drawerStack = createDrawerNavigator(
  {
    App: { screen: appStack }
  },
  {
    contentComponent: props => <Drawer {...props} />
  }
)

const RootNavigator = createSwitchNavigator(
  {
    AuthLoading: Loading,
    App: drawerStack,
    Auth: authStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

export default RootNavigator
