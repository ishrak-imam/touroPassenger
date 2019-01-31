
import config from '../../utils/config'
import { mockToken, mockSSNData } from '../../mockData'
import { postRequest } from '../../utils/request'

export const login = (user, password) => {
  return config.useMockData ? mockToken() : postRequest('token', { user, password })
}

export const requestSSNData = ssn => {
  const headers = {
    'Authorization': `Bearer ${config.ssnAuthToken}`
  }
  return config.useMockData
    ? mockSSNData()
    : postRequest('functions/SSNLookup?IncludeCustomer', { ssn }, headers)
}
