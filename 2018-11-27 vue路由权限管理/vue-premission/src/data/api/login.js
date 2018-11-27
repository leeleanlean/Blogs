// import request from '@/common/request'

export let login = (params) => {
  return new Promise((resolve, reject) => {
    if (params.username === 'admin') {
      resolve({
        username: 'admin',
        menu: [
          {
            path: '/Lee',
            name: 'Lee',
            filePath: '@/pages/Lee'
          }
        ]
      })
    } else if (params.username === 'guest') {
      resolve({
        username: 'guest',
        menu: [
          {
            label: 'guest-1',
            value: '/guest-1',
            child: [
              {
                label: 'guest-1-1',
                value: '/guest-1-1'
              },
              {
                label: 'guest-1-2',
                value: '/guest-1-2'
              }
            ]
          },
          {
            label: 'guest-2',
            value: '/guest-2',
            child: [
              {
                label: 'guest-2-1',
                value: '/guest-2-1'
              },
              {
                label: 'guest-2-2',
                value: '/guest-2-2'
              }
            ]
          }
        ]
      })
    }
  })
}
