
import { createAction } from '../../utils/reduxHelpers'

export const INIT = 'INIT'

export const LOGIN_REQ = 'LOGIN_REQ'
export const LOGIN_SUCS = 'LOGIN_SUCS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const SSN_DATA_REQ = 'SSN_DATA_REQ'
export const SSN_DATA_SUCS = 'SSN_DATA_SUCS'
export const SSN_DATA_FAIL = 'SSN_DATA_FAIL'

export const CLEAR_SSN_DATA = 'CLEAR_SSN_DATA'

export const LOGOUT_REQ = 'LOGOUT_REQ'
export const LOGOUT_SUCS = 'LOGOUT_SUCS'

export const init = createAction(INIT)

export const loginReq = createAction(LOGIN_REQ)
export const loginSucs = createAction(LOGIN_SUCS)
export const loginFail = createAction(LOGIN_FAIL)

export const ssnDataReq = createAction(SSN_DATA_REQ)
export const ssnDataSucs = createAction(SSN_DATA_SUCS)
export const ssnDataFail = createAction(SSN_DATA_FAIL)

export const clearSSNData = createAction(CLEAR_SSN_DATA)

export const logoutReq = createAction(LOGOUT_REQ)
export const logoutSucs = createAction(LOGOUT_SUCS)
