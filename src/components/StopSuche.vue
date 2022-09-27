<template>
  <div class="pt-10 space-x-5 place-content-center">
    <input
      type="text"
      placeholder="Search..."
      class="rounded-lg m-1 font-medium text-gray-800 px-3 py-1"
      v-model="state.searchQuery"
      @keyup.enter="search()"
    />
    <button
      class="bg-green-400 rounded-lg m-1 font-medium text-gray-800 px-3 py-1"
      @click="search()"
    >
      Suchen
    </button>
  </div>
  <div v-if="state.loading">Loading...</div>
  <div v-else-if="state.error" class="mt-10">
    {{ state.error.message }}
    <span class="block">Reason: {{ state.error.response.data.msg }}</span>
  </div>
  <div v-else class="mt-10">
    <div v-for="stop in state.stops" :key="stop.id" class="text-left py-1">
      {{ stop.name }}
      <div class="flex space-x-2 mb-3 mt-1">
        <img
          src="@/assets/icons/S-Bahn-Logo.svg"
          alt="S-Bahn-Logo"
          v-if="stop.products.suburban"
          class="w-6"
        />
        <img
          src="@/assets/icons/U-Bahnlogo_Berlin.png"
          alt="U-Bahn-Logo"
          v-if="stop.products.subway"
          class="w-6"
        />
        <img
          src="@/assets/icons/Tram-Logo.svg"
          alt="Tram-Logo"
          v-if="stop.products.tram"
          class="w-6"
        />
        <img
          src="@/assets/icons/BUS-Logo-BVG.svg"
          alt="Bus-Logo"
          v-if="stop.products.bus"
          class="w-6"
        />
        <img
          src="@/assets/icons/Faehre-Signet_VBB.svg"
          alt="Faehre-Logo"
          v-if="stop.products.ferry"
          class="w-6"
        />
        <img
          src="@/assets/icons/Signet_Fernverkehr_VBB.svg"
          alt="Fernverkehr-Logo"
          v-if="stop.products.express"
          class="w-6"
        />
        <img
          src="@/assets/icons/VBB_Bahn-Regionalverkehr.svg"
          alt="Regionalverkehr-Logo"
          v-if="stop.products.regional"
          class="w-6"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { stopsApi } from '@/api'

const state = ref({
  searchQuery: '',
  loading: false,
  error: null,
  stops: [],
})

const search = async () => {
  try {
    state.value.loading = true
    const response = await stopsApi.findByQuery({
      query: state.value.searchQuery,
      poi: false,
      addresses: false,
    })
    state.value.stops = response.data
  } catch (error) {
    state.value.error = error
  } finally {
    state.value.loading = false
  }
}
</script>

<style></style>
