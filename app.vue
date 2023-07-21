<script setup lang="ts">
import { themeChange } from 'theme-change'
onMounted(() => {
  themeChange(false)
})
</script>
<template>
  <div class="bg-slate-100 h-full">
    <NuxtPage />
  </div>
</template>
