
import { call } from 'redux-saga/effects'
import { takeFirst } from '../utils/sagaHelpers'
import { navigate } from '../navigation/service'
import { navigateToScene } from './action'

const navActions = [
  navigateToScene.getType()
]

export function * watchNavActions () {
  yield takeFirst(navActions, navigationWorker)
}

function * navigationWorker (action) {
  switch (action.type) {
    case 'NAVIGATE_TO_SCENE':
      yield call(navigate, action.payload)
  }
}
