<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { stopsDetailsApi } from '@/api'
import moment from 'moment'
import { useFavoriteStore } from '@/stores/favorite'

const state = ref({
  details: null,
  departures: null,
  loading: false,
  error: null,
  isFavorite: null,
})

const route = useRoute()

onMounted(async () => {
  try {
    state.value.loading = true
    const response = await stopsDetailsApi.findById(route.params.id, {
      linesOfStops: true,
    })
    state.value.details = response.data
    const departures = await stopsDetailsApi.findDepartures(route.params.id, {
      linesOfStops: true,
    })
    state.value.departures = departures.data
  } catch (error) {
    state.value.error = error
  } finally {
    state.value.loading = false
  }
})

const formatDateTime = (value) => {
  return moment(value).format('HH:mm')
}

const toMinutes = (seconds) => {
  return seconds / 60
}

const containsStop = (stopId) => {
  for (let i = 0; i < state.value.departures.length; i++) {
    if (state.value.departures[i].stop.id == stopId) return true
  }
}

const storeFavorite = useFavoriteStore()
const getFavoriteById = storeFavorite.getFavoriteById
</script>

<template>
  <div v-if="state.loading" class="flex justify-center items-center mt-10">
    <div
      class="animate-spin rounded-full h-64 w-64 border-b-8 border-white-900"
    ></div>
  </div>
  <div v-else-if="state.error" class="mt-10">
    {{ state.error.message }}
    <span class="block">Reason: {{ state.error.response.data.msg }}</span>
  </div>
  <div v-else-if="state.details">
    <div class="flex justify-center items-center relative">
      <h1 class="text-6xl">{{ state.details.name }}</h1>
      <img
        src="@/assets/icons/favorite_white.svg"
        alt="Favorite-Icon"
        class="absolute right-10 cursor-pointer"
        v-if="getFavoriteById(state.details.id)"
        @click="storeFavorite.remove(state.details.id)"
      />
      <img
        src="@/assets/icons/favorite_border.svg"
        alt="Kein-Favorite-Icon"
        class="absolute right-10 cursor-pointer"
        v-else
        @click="storeFavorite.add(state.details.id)"
      />
    </div>
    <div
      v-for="stop in state.details.stops"
      :key="stop.id"
      class="mt-10 text-left border rounded-3xl p-5"
    >
      <h2 class="text-3xl mb-5">{{ stop.name }}</h2>
      <div v-if="stop.lines" class="flex place-content-start space-x-2">
        <h3 class="text-xl">Linien:</h3>
        <div v-for="line in stop.lines" :key="line.id">
          <img
            src="@/assets/icons/S-Bahn-Logo.svg"
            alt="S-Bahn-Logo"
            v-if="line.product == 'suburban'"
            class="w-6 mx-auto"
          />
          <img
            src="@/assets/icons/U-Bahnlogo_Berlin.png"
            alt="U-Bahn-Logo"
            v-if="line.product == 'subway'"
            class="w-6 mx-auto"
          />
          <img
            src="@/assets/icons/Tram-Logo.svg"
            alt="Tram-Logo"
            v-if="line.product == 'tram'"
            class="w-6 mx-auto"
          />
          <img
            src="@/assets/icons/BUS-Logo-BVG.svg"
            alt="Bus-Logo"
            v-if="line.product == 'bus'"
            class="w-6 mx-auto"
          />
          <img
            src="@/assets/icons/Faehre-Signet_VBB.svg"
            alt="Faehre-Logo"
            v-if="line.product == 'ferry'"
            class="w-6 mx-auto"
          />
          <img
            src="@/assets/icons/Signet_Fernverkehr_VBB.svg"
            alt="Fernverkehr-Logo"
            v-if="line.product == 'express'"
            class="w-6 mx-auto"
          />
          <img
            src="@/assets/icons/VBB_Bahn-Regionalverkehr.svg"
            alt="Regionalverkehr-Logo"
            v-if="line.product == 'regional'"
            class="w-6 mx-auto"
          />
          {{ line.name }}
        </div>
      </div>
      <div v-else class="flex place-content-start space-x-2">
        <h3 class="text-xl">Linien:</h3>
        <p class="text-xl">Keine Linien gefunden</p>
      </div>
      <div v-if="containsStop(stop.id)">
        <h3 class="text-xl">Nächste Abfahrten</h3>
        <div class="grid grid-cols-12 text-center place-items-stretch">
          <p class="border-r px-5 col-start-1 col-end-1">Linie</p>
          <p class="border-r px-5 col-start-2 col-span-6">Richtung</p>
          <p class="border-r px-5 col-start-8 col-span-1">Abfahrt</p>
          <p class="border-r px-5 col-start-9 col-span-2">Verzögerung</p>
          <p class="border-r px-5 col-start-11 col-span-1">Geplante Abfahrt</p>
          <p class="px-5 col-start-12 col-span-1">Bahnsteig</p>
          <div class="col-start-1 col-end-13 border-t"></div>
          <div
            v-for="trip in state.departures"
            :key="trip.tripId"
            class="col-start-1 col-end-13"
          >
            <div v-if="trip.stop.id == stop.id" class="flex flex-row">
              <div class="basis-1/12 border-r px-2">{{ trip.line.name }}</div>
              <div class="basis-6/12 border-r px-2">{{ trip.direction }}</div>
              <div class="basis-1/12 border-r px-2">
                {{ formatDateTime(trip.when) }}
              </div>
              <div
                v-if="trip.delay > 0"
                class="text-red-600 basis-2/12 border-r px-2"
              >
                +{{ toMinutes(trip.delay) }} Minuten
              </div>
              <div
                v-else-if="trip.delay < 0"
                class="text-green-600 basis-2/12 border-r px-2"
              >
                {{ toMinutes(trip.delay) }} Minuten
              </div>
              <div v-else class="basis-2/12 border-r px-2"></div>
              <div class="basis-1/12 border-r px-2">
                {{ formatDateTime(trip.plannedWhen) }}
              </div>
              <div
                v-if="trip.platform != trip.plannedPlatform"
                class="basis-1/12 px-2"
              >
                {{ trip.plannedPlatform }} => {{ trip.platform }}
              </div>
              <div v-else class="basis-1/12 px-2">{{ trip.platform }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
