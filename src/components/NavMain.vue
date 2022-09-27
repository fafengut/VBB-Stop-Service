<script setup>
import NavItem from '@/components/NavItem.vue'
</script>

<template>
  <nav class="top-0 p-8">
    <ul class="list-none flex space-x-5 place-content-center">
      <NavItem to="/" title="Home" />
      <NavItem to="/favorites" title="Favorites" />
      <NavItem to="/about" title="About" />
    </ul>
  </nav>
</template>
