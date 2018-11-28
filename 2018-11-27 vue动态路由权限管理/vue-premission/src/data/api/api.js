import request from '@/common/request'

export let Ids = (data) => {
  return request({
    url: '/api/ids'
  })
}

export let Hhh = (data) => {
  return request({
    url: '/api/hhh'
  })
}
