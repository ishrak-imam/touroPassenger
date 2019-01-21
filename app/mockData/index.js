
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

export const mockUser = () => new Promise(resolve => {
  setTimeout(() => {
    return resolve({
      'id': 52,
      'email': 'ishrak@cefalo.com',
      'lastName': 'Ibne Imam',
      'firstName': 'Ishrak',
      'hash': '',
      'salt': '',
      'activeDirectoryName': null,
      'phone': ''
    })
  }, 2000)
})
