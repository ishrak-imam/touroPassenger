
import { readValue } from '../utils/immutable'
import { store } from '../store'
import { getConnection } from '../selectors'

const { dispatch } = store

export const networkActionDispatcher = action => {
  const connection = getConnection(store.getState())
  const isOnline = readValue('online', connection)
  isOnline ? dispatch(action) : console.log('No internet')
}

export const actionDispatcher = action => {
  dispatch(action)
}
