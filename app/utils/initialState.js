
import { LOGIN_INITIAL_STATE } from '../modules/auth/immutable'
import { CONNECTION_INITIAL_STATE } from '../connection/immutable'
import { NAV_INITIAL_STATE } from '../navigation/immutable'
import { IMAGE_CACHE_INITIAL_STATE } from '../components/imageCache/immutable'
import { APP_INITIAL_STATE } from '../modules/app/immutable'
import { NOTIFICATION_INITIAL_STATE } from '../notification/immutable'

export const getInitialState = () => {
  return {
    login: LOGIN_INITIAL_STATE,
    connection: CONNECTION_INITIAL_STATE,
    navigation: NAV_INITIAL_STATE,
    imageCache: IMAGE_CACHE_INITIAL_STATE,
    app: APP_INITIAL_STATE,
    notification: NOTIFICATION_INITIAL_STATE
  }
}
