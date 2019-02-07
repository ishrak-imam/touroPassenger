
import config from '../../utils/config'
import { mockToken } from '../../mockData'
import { postRequest } from '../../utils/request'

export const login = (booking, ssn, password, loginType) => {
  return config.useMockData ? mockToken() : postRequest('token', { booking, ssn, password, loginType })
}

export const requestSSNData = ssn => {
  const headers = {
    'Authorization': `Bearer ${config.ssnAuthToken}`
  }
  // return config.useMockData
  //   ? mockSSNData()
  //   : postRequest('functions/SSNLookup?IncludeCustomer', { ssn }, headers)
  return postRequest('functions/SSNLookup?IncludeCustomer', { ssn }, headers)
}
