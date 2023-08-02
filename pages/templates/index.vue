<script setup lang="ts">
import { ConcreteComponent } from 'nuxt/dist/app/compat/capi'
import { Simple } from '~/.nuxt/components'

const simpleTemp = resolveComponent('simple')
const AppHeader = resolveComponent('AppHeader')
const current = ref<string>('simpleTemp')
const componentsName: ConcreteComponent = { simpleTemp, AppHeader }
const template = ref<InstanceType<typeof Simple> | null>(null)

const addModule = () => {
  template.value?.addComponent()
}
</script>

<template>
  <div
    id="resume-container"
    class="mx-auto w-[800px] pb-16 bg-white card card-compact shadow-md rounded-sm"
  >
    <component
      :is="componentsName[current]"
      ref="template"
    />
  </div>
  <div class="fixed top-0 right-0 bottom-0 flex">
    <div
      class="btn"
      @click="addModule"
    >
      自定义模块
    </div>
  </div>
</template>
