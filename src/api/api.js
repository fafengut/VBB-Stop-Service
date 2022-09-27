import axios from 'axios'

const _api = axios.create({
  baseURL: 'https://v5.vbb.transport.rest',
})

export default {
  get: (url, params) => {
    return _api.get(url, { params }).then((response) => {
      return {
        data: response.data,
      }
    })
  },
  post: (url, params) => {
    let data = { ...params }
    if (params instanceof FormData) {
      data = params
    }

    return _api.post(url, data)
  },
}
