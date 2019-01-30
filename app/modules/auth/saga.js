
import { call, put } from 'redux-saga/effects'
import { takeFirst } from '../../utils/sagaHelpers'
import {
  init,
  loginReq, loginSucs, loginFail,
  logoutReq, logoutSucs,
  ssnDataReq, ssnDataSucs, ssnDataFail
} from './action'
// import { clearImageCache } from '../../components/imageCache/action'
import { navigateToScene } from '../../navigation/action'
import localStore, { USER } from '../../utils/persist'
import { login, requestSSNData } from './api'

export function * watchInit () {
  yield takeFirst(init.getType(), workerInit)
}

function * workerInit () {
  try {
    const user = yield call(localStore.get, USER)
    if (user.accessToken) {
      yield put(loginSucs(user))
      yield put(navigateToScene({ routeName: 'App' }))
    } else {
      yield put(navigateToScene({ routeName: 'Auth' }))
    }
  } catch (e) {
    yield put(navigateToScene({ routeName: 'Auth' }))
  }
}

export function * watchLogin () {
  yield takeFirst(loginReq.getType(), workerLogin)
}

const formatUserData = user => {
  return {
    id: user.id,
    accessToken: user.access_token,
    expiresIn: user.expires_in,
    firstName: user.first_name,
    lastName: user.last_name,
    fullName: user.full_name,
    group: user.group,
    image: user.image
  }
}

function * workerLogin (action) {
  const { user, password, failMsg } = action.payload
  try {
    const result = yield call(login, user, password)
    yield call(localStore.set, USER, formatUserData(result))
    yield put(init())
  } catch (e) {
    yield put(loginFail({
      notification: { type: 'ERROR', message: e || failMsg }
    }))
  }
}

export function * watchGetSSNData () {
  yield takeFirst(ssnDataReq.getType(), workerGetSSNData)
}

function * workerGetSSNData (action) {
  const { ssn, failMsg } = action.payload
  try {
    const ssnData = yield call(requestSSNData, ssn)
    ssnData.ssn = ssn
    yield put(ssnDataSucs(ssnData))
  } catch (e) {
    yield put(ssnDataFail({
      notification: { type: 'ERROR', message: e || failMsg }
    }))
  }
}

export function * watchLogout () {
  yield takeFirst(logoutReq.getType(), workerLogout)
}

function * workerLogout () {
  yield call(localStore.delete, USER)
  // yield put(clearImageCache())
  yield put(logoutSucs())
  yield put(init())
}
