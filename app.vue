<script setup lang="ts">
import { themeChange } from 'theme-change'
onMounted(() => {
  themeChange(false)
})
</script>
<template>
  <NuxtPage />
  <nuxt-link to="/main">
    我的简历
  </nuxt-link>
</template>
