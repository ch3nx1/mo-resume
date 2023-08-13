<script setup lang="ts">
import { themeChange } from 'theme-change'
onMounted(() => {
  themeChange(false)
})
</script>
<template>
  <div>
    <NuxtPage />
  </div>
</template>
