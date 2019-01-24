
import { createReducer } from '../utils/reduxHelpers'
import { getMap } from '../utils/immutable'

import {
  NOTIFY, CLEAR_NOTIFICATION
} from './action'

import { NOTIFICATION_INITIAL_STATE } from './immutable'

export const notification = createReducer(NOTIFICATION_INITIAL_STATE, {
  [NOTIFY]: (state, payload) => getMap(payload),
  [CLEAR_NOTIFICATION]: state => getMap({})
})
