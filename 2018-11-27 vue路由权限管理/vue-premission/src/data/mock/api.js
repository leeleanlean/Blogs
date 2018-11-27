import Mock from 'mockjs'

Mock.mock('/api/ids', {
  type: '1',
  'list|10': [{ 'id|+1': 1 }]
})

Mock.mock('/api/hhh', {
  'list|10': [{ 'id|+1': 1 }]
})
