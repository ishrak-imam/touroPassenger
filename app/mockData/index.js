
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
      firstName: 'Ishrak',
      lastName: 'Ibne Imam',
      address: '83/1 East Rajabazar, Farmgate',
      zip: '1217',
      city: 'Dhaka',
      email: 'ishrak@cefalo.com'
    })
  }, 2000)
})
