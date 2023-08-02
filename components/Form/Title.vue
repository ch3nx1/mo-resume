<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
<template>
  <div class="divider">
    <div class="rounded-3xl bg-slate-200 px-3 py-1">{{ title }}</div>
  </div>
</template>
