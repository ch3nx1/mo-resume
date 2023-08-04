<script setup lang="ts">
import { ConcreteComponent } from 'nuxt/dist/app/compat/capi'
import draggable from 'vuedraggable'
const SimpleHeader = shallowRef(resolveComponent('SimpleHeader'))
const SimpleSkills = shallowRef(resolveComponent('SimpleSkills'))
const SimpleEducation = shallowRef(resolveComponent('SimpleEducation'))
const SimpleExperience = shallowRef(resolveComponent('SimpleExperience'))
const SimpleCustom = shallowRef(resolveComponent('SimpleCustom'))

// ref 不会深度代理shallowRef的对象
interface DraggableComponent {
  id: number
  name: ConcreteComponent
}
const componentsList = ref<Array<DraggableComponent>>([
  { id: 0, name: SimpleHeader },
  { id: 1, name: SimpleSkills },
  { id: 2, name: SimpleEducation },
  { id: 3, name: SimpleExperience }
])
const addComponent = () => {
  componentsList.value.push({
    id: componentsList.value.length,
    name: SimpleCustom
  })
}
const deleteCustom = (id: number) => {
  componentsList.value.forEach((item, index) => {
    if (item.id === id) {
      componentsList.value.splice(index, 1)
    }
  })
}
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
const dynamicEmits = (currentComponent: ConcreteComponent): object | null => {
  if (currentComponent === SimpleCustom.value) {
    return { 'delete-custom': deleteCustom }
  }
  // resolve [Vue warn]: v-on with no argument expects an object value.
  return {}
}
defineExpose({
  addComponent
})
</script>
<template>
  <draggable
    :list="componentsList"
    item-key="id"
    animation="500"
  >
    <template #item="{ element }">
      <div>
        <component
          :is="element.name"
          v-bind="dynamicProps(element.name, element.id)"
          v-on="dynamicEmits(element.name)"
        ></component>
      </div>
    </template>
  </draggable>
</template>
