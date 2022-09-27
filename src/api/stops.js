import api from '@/api/api'

const LOCATION_ROOT = 'locations'

export default {
  findByQuery: async (payload) => {
    return await api.get(LOCATION_ROOT, payload)
  },
  findById: async (id) => {
    return await api.get(`${LOCATION_ROOT}/${id}`)
  },
}
