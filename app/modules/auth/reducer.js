
import { createReducer } from '../../utils/reduxHelpers'
import { getMap, mergeMapShallow, setIntoMap } from '../../utils/immutable'

import {
  LOGIN_REQ, LOGIN_SUCS, LOGIN_FAIL,
  LOGOUT_SUCS,
  SSN_DATA_REQ, SSN_DATA_SUCS, SSN_DATA_FAIL,
  CLEAR_SSN_DATA
} from './action'

import { LOGIN_INITIAL_STATE } from './immutable'

export const login = createReducer(LOGIN_INITIAL_STATE, {

  [LOGIN_REQ]: state => mergeMapShallow(state, getMap({ isLoading: true })),
  [LOGIN_SUCS]: (state, payload) => mergeMapShallow(state, getMap({ isLoading: false, user: getMap(payload) })),
  [LOGIN_FAIL]: state => mergeMapShallow(state, getMap({ isLoading: false })),

  [SSN_DATA_REQ]: state => setIntoMap(state, 'isLoading', true),
  [SSN_DATA_SUCS]: (state, payload) => mergeMapShallow(state, getMap({ isLoading: false, ssnData: getMap(payload) })),
  [SSN_DATA_FAIL]: state => setIntoMap(state, 'isLoading', false),

  [CLEAR_SSN_DATA]: state => setIntoMap(state, 'ssnData', getMap({})),

  [LOGOUT_SUCS]: state => state // just return the state as no update required
})
