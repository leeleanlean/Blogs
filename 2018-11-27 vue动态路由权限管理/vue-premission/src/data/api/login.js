// import request from '@/common/request'

export let login = (params) => {
  return new Promise((resolve, reject) => {
    if (params.username === 'admin') {
      resolve({
        username: 'admin',
        token: 'sfsfgjfgjsdfedfhgdhdh',
        menu: [
          {
            path: '/Admin',
            filePath: '/Admin/Admin',
            name: 'Admin',
            children: [
              {
                path: '/Admin-1',
                filePath: '/Admin/Admin-1',
                name: 'Admin-1'
              },
              {
                path: '/Admin-2',
                filePath: '/Admin/Admin-2',
                name: 'Admin-2'
              }
            ]
          }
        ]
      })
    } else if (params.username === 'guest') {
      resolve({
        username: 'guest',
        token: '18342879248794238691263',
        menu: [
          {
            path: '/Guest',
            filePath: '/Guest/Guest',
            name: 'Guest',
            children: [
              {
                path: '/Guest-1',
                filePath: '/Guest/Guest-1',
                name: 'Guest-1'
              },
              {
                path: '/Guest-2',
                filePath: '/Guest/Guest-2',
                name: 'Guest-2'
              }
            ]
          }
        ]
      })
    }
  })
}
