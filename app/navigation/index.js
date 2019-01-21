
import {
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation'

import LoadingScreen from '../modules/auth/loadingScreen'
import Login from '../modules/auth/login'
import HomeScreen from '../modules/home'

const authStack = createStackNavigator(
  {
    Login: { screen: Login }
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
)

const appStack = createStackNavigator(
  {
    Home: { screen: HomeScreen }
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
)

const RootNavigator = createSwitchNavigator(
  {
    AuthLoading: LoadingScreen,
    App: appStack,
    Auth: authStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

export default RootNavigator
