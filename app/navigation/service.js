
import { NavigationActions } from 'react-navigation'
let _navigator = null

export const setNavigator = navigator => {
  _navigator = navigator
}

export const navigate = route => {
  _navigator.dispatch(NavigationActions.navigate(route))
}
