<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const props = defineProps({
  to: { type: String, required: true },
  title: { type: String, required: true },
})

const active = computed(() => `/${route.path.split('/')[1]}` === props.to)
</script>

<template>
  <li class="list-none">
    <RouterLink
      :to="props.to"
      :class="[
        { 'underline text-green-400': active },
        'hover:text-green-400/75 font-bold text-white',
      ]"
    >
      <span>{{ props.title }}</span>
    </RouterLink>
  </li>
</template>
