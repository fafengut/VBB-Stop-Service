import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore({
  id: 'favorites',
  state: () => ({
    _favorites: [],
  }),
  getters: {
    favorites: (state) => state._favorites,
  },
  actions: {
    add(id) {
      this._favorites.push(id)
    },
  },
})
