
import { createAction } from '../utils/reduxHelpers'

export const NOTIFY = 'NOTIFY'
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

export const notify = createAction(NOTIFY)
export const clearNotification = createAction(CLEAR_NOTIFICATION)
