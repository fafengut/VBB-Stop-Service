import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore({
  id: 'favorites',
  state: () => ({
    _favorites: [],
  }),
  getters: {
    getAllFavorites: (state) => state._favorites,
    getFavoriteById: (state) => {
      return (stopId) =>
        state._favorites.find((favorite) => favorite === stopId)
    },
  },
  actions: {
    add(id) {
      this._favorites.push(id)
    },
    remove(id) {
      this._favorites.splice(this._favorites.indexOf(id))
    },
  },
  persist: true,
})
