<script setup lang="ts">
import { ConcreteComponent } from 'nuxt/dist/app/compat/capi'

const simple = resolveComponent('simple')
const AppHeader = resolveComponent('AppHeader')
const current = ref<string>('simple')
const componentsName: ConcreteComponent = { simple, AppHeader }
</script>

<template>
  <div
    id="resume-container"
    class="mx-auto w-[800px] pb-16 bg-white"
  >
    <component :is="componentsName[current]" />
  </div>
</template>
