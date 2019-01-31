
export const mockToken = () => new Promise(resolve => {
  setTimeout(() => {
    return resolve({
      'access_token': 'some_token',
      'expires_in': 315360000,
      'id': 52,
      'group': 'Users',
      'full_name': 'Ishrak Ibne Imam',
      'first_name': 'Ishrak',
      'last_name': 'Ibne Imam',
      'image': ''
    })
  }, 2000)
})

export const mockSSNData = () => new Promise(resolve => {
  setTimeout(() => {
    return resolve({
      ssn: '',
      FirstName: 'Ishrak',
      LastName: 'Ibne Imam',
      Address: '83/1 East Rajabazar, Farmgate',
      Zip: '23637',
      City: 'Dhaka',
      Email: 'ishrak@cefalo.com'
    })
  }, 2000)
})
