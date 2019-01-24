
import { notify } from '../notification/action'

const notification = store => next => action => {
  if (action.payload && action.payload.notification) {
    const { notification } = action.payload
    store.dispatch(notify(notification))
  }
  next(action)
}

export default notification
