<script setup lang="ts">
const selected = ref<boolean>(false)
defineProps<{
  clickAction: any
}>()
</script>

<template>
  <div class="relative rounded mx-7 border-[1px] border-transparent">
    <slot :selected="selected"></slot>
    <q-menu
      touch-position
      context-menu
      @before-hide="selected = false"
      @before-show="selected = true"
    >
      <q-list dense>
        <q-item
          v-close-popup
          clickable
        >
          <q-item-section @click="clickAction.add">{{
            $t('add')
          }}</q-item-section>
        </q-item>
        <q-item
          v-close-popup
          clickable
        >
          <q-item-section @click="clickAction.delete">{{
            $t('delete')
          }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
    <div
      v-if="selected"
      class="w-full border-2 border-solid rounded border-green-500 absolute top-[-2px] right-[-2px] bottom-[-2px] left-[-2px]"
    ></div>
  </div>
</template>
