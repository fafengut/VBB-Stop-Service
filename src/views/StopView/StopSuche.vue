<script setup>
import { ref } from 'vue'
import { stopsApi } from '@/api'
import { useRouter } from 'vue-router'

const router = useRouter()

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

const goToDetails = (id) => {
  router.push({ path: `/stops/${id}` })
}
</script>

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
  <div v-if="state.loading" class="flex justify-center items-center mt-10">
    <div
      class="animate-spin rounded-full h-64 w-64 border-b-8 border-white-900"
    ></div>
  </div>
  <div v-else-if="state.error" class="mt-10">
    {{ state.error.message }}
    <span class="block">Reason: {{ state.error.response.data.msg }}</span>
  </div>
  <div v-else-if="state.stops" class="mt-10">
    <div
      v-for="stop in state.stops"
      :key="stop.id"
      class="text-left py-1 cursor-pointer hover:text-green-400"
      @click="goToDetails(stop.id)"
    >
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
