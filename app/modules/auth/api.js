
import config from '../../utils/config'
import { mockToken } from '../../mockData'
import { postRequest } from '../../utils/request'

export const login = (user, password) => {
  return config.useMockData ? mockToken() : postRequest('token', { user, password })
}
