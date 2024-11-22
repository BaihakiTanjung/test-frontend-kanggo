<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <h1 class="lg:text-3xl text-xl font-bold text-center mt-8">Product Management App</h1>

  <div class="container mx-auto p-4">
    <RouterView />
  </div>
</template>
