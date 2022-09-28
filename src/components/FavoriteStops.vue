<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoriteStore } from '@/stores/favorite'
import { stopsDetailsApi } from '@/api'

const router = useRouter()

const goToDetails = (id) => {
  router.push({ path: `/stops/${id}` })
}

const storeFavorite = useFavoriteStore()
const getFavoriteById = storeFavorite.getFavoriteById

const state = ref({
  loading: false,
  error: null,
  favorites: [],
})

onMounted(async () => {
  try {
    state.value.loading = true
    const favorites = storeFavorite._favorites
    if (favorites) {
      for (let i = 0; i < favorites.length; i++) {
        const response = await stopsDetailsApi.findById(favorites[i])
        state.value.favorites.push({
          id: response.data.id,
          name: response.data.name,
          products: response.data.products,
        })
      }
    }
  } catch (error) {
    state.value.error = error.message
  } finally {
    state.value.loading = false
  }
})
</script>

<template>
  <div v-if="state.loading" class="flex justify-center items-center mt-10">
    <div
      class="animate-spin rounded-full h-64 w-64 border-b-8 border-white-900"
    ></div>
  </div>
  <div v-else-if="state.error" class="mt-10">
    {{ state.error }}
  </div>
  <div
    v-else-if="state.favorites.length > 0"
    class="w-[25vw] min-w-[18rem] max-w-sm"
  >
    <div
      v-for="favorite in state.favorites"
      :key="favorite.id"
      class="text-left py-1 cursor-pointer hover:text-green-400 relative"
    >
      <div class="flex justify-between">
        <div @click="goToDetails(favorite.id)">
          {{ favorite.name }}
        </div>
        <img
          src="@/assets/icons/favorite_white.svg"
          alt="Favorite-Icon"
          v-if="getFavoriteById(favorite.id)"
          @click="storeFavorite.remove(favorite.id)"
        />
        <img
          src="@/assets/icons/favorite_border.svg"
          alt="Kein-Favorite-Icon"
          v-else
          @click="storeFavorite.add(favorite.id)"
        />
      </div>
      <div class="flex space-x-2 mb-3 mt-1" @click="goToDetails(favorite.id)">
        <img
          src="@/assets/icons/S-Bahn-Logo.svg"
          alt="S-Bahn-Logo"
          v-if="favorite.products.suburban"
          class="w-6"
        />
        <img
          src="@/assets/icons/U-Bahnlogo_Berlin.png"
          alt="U-Bahn-Logo"
          v-if="favorite.products.subway"
          class="w-6"
        />
        <img
          src="@/assets/icons/Tram-Logo.svg"
          alt="Tram-Logo"
          v-if="favorite.products.tram"
          class="w-6"
        />
        <img
          src="@/assets/icons/BUS-Logo-BVG.svg"
          alt="Bus-Logo"
          v-if="favorite.products.bus"
          class="w-6"
        />
        <img
          src="@/assets/icons/Faehre-Signet_VBB.svg"
          alt="Faehre-Logo"
          v-if="favorite.products.ferry"
          class="w-6"
        />
        <img
          src="@/assets/icons/Signet_Fernverkehr_VBB.svg"
          alt="Fernverkehr-Logo"
          v-if="favorite.products.express"
          class="w-6"
        />
        <img
          src="@/assets/icons/VBB_Bahn-Regionalverkehr.svg"
          alt="Regionalverkehr-Logo"
          v-if="favorite.products.regional"
          class="w-6"
        />
      </div>
    </div>
  </div>
</template>
