<script setup lang="ts">
import { themeChange } from 'theme-change'
onMounted(() => {
  themeChange(false)
})
</script>
<template>
  <AppHeader />
  <div class="container mx-auto px-6">
    <NuxtPage />
    <nuxt-link to="/main">
      我的简历
    </nuxt-link>
  </div>
</template>
