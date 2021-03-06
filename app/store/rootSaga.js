
import { fork, all } from 'redux-saga/effects'

import * as appSaga from '../modules/app/saga'
import * as connectionSaga from '../connection/saga'
import * as navSaga from '../navigation/saga'
import * as cacheImageSaga from '../components/imageCache/saga'
import * as authSaga from '../modules/auth/saga'

const sagas = {
  ...appSaga,
  ...connectionSaga,
  ...navSaga,
  ...cacheImageSaga,
  ...authSaga
}

const forkedSagas = Object.keys(sagas).map(key => fork(sagas[key]))

export default function * rootSaga () {
  yield all(forkedSagas)
}
