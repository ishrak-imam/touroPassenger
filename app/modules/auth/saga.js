
import { call, put } from 'redux-saga/effects'
import { takeFirst } from '../../utils/sagaHelpers'
import {
  init,
  loginReq, loginSucs, loginFail,
  logoutReq, logoutSucs,
  ssnDataReq, ssnDataSucs, ssnDataFail
} from './action'
// import { clearImageCache } from '../../components/imageCache/action'
import { NavigationActions } from 'react-navigation'
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
      const { loginType } = user
      const appStartAt = loginType === 'booking' ? 'Trip' : 'Trips'
      const navigationIcon = loginType === 'booking' ? 'menu' : 'back'
      const route = {
        routeName: 'App',
        action: NavigationActions.navigate({ routeName: appStartAt, params: { navigationIcon } })
      }
      yield put(navigateToScene(route))
    } else {
      const route = { routeName: 'Auth' }
      yield put(navigateToScene(route))
    }
  } catch (e) {
    const route = { routeName: 'Auth' }
    yield put(navigateToScene(route))
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
    image: user.image,
    loginType: user.loginType
  }
}

function * workerLogin (action) {
  const { booking, ssn, password, loginType, failMsg } = action.payload
  try {
    const result = yield call(login, booking, ssn, loginType, password)
    result.loginType = loginType
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
