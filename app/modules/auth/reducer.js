
import { createReducer } from '../../utils/reduxHelpers'
import { getMap, mergeMapShallow } from '../../utils/immutable'

import {
  LOGIN_REQ, LOGIN_SUCS, LOGIN_FAIL,
  LOGOUT_SUCS
} from './action'

import { LOGIN_INITIAL_STATE } from './immutable'

export const login = createReducer(LOGIN_INITIAL_STATE, {
  [LOGIN_REQ]: state => mergeMapShallow(state, getMap({ isLoading: true })),
  [LOGIN_SUCS]: (state, payload) => mergeMapShallow(state, getMap({ isLoading: false, user: getMap(payload) })),
  [LOGIN_FAIL]: state => mergeMapShallow(state, getMap({ isLoading: false })),

  [LOGOUT_SUCS]: state => state // just return the state as no update required
})
