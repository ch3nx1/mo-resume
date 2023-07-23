<script setup lang="ts">
import draggable from 'vuedraggable'

const SimpleHeader = shallowRef(resolveComponent('SimpleHeader'))
const SimpleSkills = shallowRef(resolveComponent('SimpleSkills'))
const componentsList = ref<Array<object>>([
  { id: 0, name: SimpleHeader },
  { id: 1, name: SimpleSkills }
])
</script>

<template>
  <draggable
    :list="componentsList"
    item-key="id"
    animation="500"
  >
    <template #item="{ element }">
      <div>
        <component :is="element.name"></component>
      </div>
    </template>
  </draggable>
</template>
