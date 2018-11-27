// import request from '@/common/request'

export let login = (params) => {
  return new Promise((resolve, reject) => {
    if (params.username === 'admin') {
      resolve({
        username: 'admin',
        menu: [
          {
            path: '/Admin',
            name: 'Admin'
          }
        ]
      })
    } else if (params.username === 'guest') {
      resolve({
        username: 'guest',
        menu: [
          {
            path: '/Guest',
            name: 'Guest'
          }
        ]
      })
    }
  })
}
