<script setup lang="ts">
import draggable from 'vuedraggable'

const SimpleHeader = shallowRef(resolveComponent('SimpleHeader'))
const SimpleSkills = shallowRef(resolveComponent('SimpleSkills'))
const SimpleEducation = shallowRef(resolveComponent('SimpleEducation'))
const SimpleExperience = shallowRef(resolveComponent('SimpleExperience'))
// ref 不会深度代理shallowRef的对象
const componentsList = ref<Array<object>>([
  { id: 0, name: SimpleHeader },
  { id: 1, name: SimpleSkills },
  { id: 2, name: SimpleEducation },
  { id: 3, name: SimpleExperience }
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
