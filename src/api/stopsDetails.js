import api from '@/api/api'

const STOPS_ROOT = 'stops'

export default {
  findById: async (id, payload) => {
    return await api.get(`${STOPS_ROOT}/${id}`, payload)
  },
  findDepartures: async (id, payload) => {
    return await api.get(`${STOPS_ROOT}/${id}/departures`, payload)
  },
}
