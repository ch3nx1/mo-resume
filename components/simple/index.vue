<script setup lang="ts">
import { ConcreteComponent } from 'nuxt/dist/app/compat/capi'
import draggable from 'vuedraggable'
import { DraggableComponent } from '~/types/user'

defineProps<{
  moduleList: DraggableComponent[]
}>()
const SimpleCustom = shallowRef(resolveComponent('SimpleCustom'))

/**
 * pass different props for dynamic components
 * @param currentComponent
 * @param id
 */
const dynamicProps = (currentComponent: ConcreteComponent, id: number) => {
  if (currentComponent === SimpleCustom.value) {
    return { customKey: id }
  }
}
// v-on="dynamicEmits(element.component)"
// const dynamicEmits = (currentComponent: ConcreteComponent): object | null => {
//   if (currentComponent === SimpleCustom.value) {
//     return { 'delete-custom': deleteCustom }
//   }
//   // resolve [Vue warn]: v-on with no argument expects an object value.
//   return {}
// }
</script>
<template>
  <draggable
    :list="moduleList"
    item-key="id"
    animation="500"
  >
    <template #item="{ element }">
      <div>
        <component
          :is="element.component"
          :is-show="element.show"
          v-bind="dynamicProps(element.component, element.id)"
        ></component>
      </div>
    </template>
  </draggable>
</template>
