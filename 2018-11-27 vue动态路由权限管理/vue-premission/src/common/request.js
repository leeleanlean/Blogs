import axios from 'axios'

let service = axios.create({
  timeout: 15000
})

service.interceptors.request.use((request) => {
  return request
})

service.interceptors.response.use((response) => {
  return response
})

export default service
