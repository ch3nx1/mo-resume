<script lang="ts" setup>
const showDialog = ref<boolean>(false)
const { skills } = storeToRefs(useUser())
defineProps<{
  isShow: boolean
}>()
</script>

<template>
  <div
    v-show="isShow"
    class="px-8 cursor-pointer hover:bg-slate-200 hover:border-dashed hover:border hover:border-blue-400"
    @click="showDialog = true"
  >
    <FormTitle :title="$t('skill')"></FormTitle>
    <div
      v-for="(skill, index) in skills"
      :key="index"
      class="my-5"
    >
      <h3 class="my-1 font-bold">{{ skill.title }}</h3>
      <ul class="px-4">
        <li
          v-for="item in skill.description"
          :key="item"
          class="list-disc"
        >
          {{ item.content }}
        </li>
      </ul>
    </div>
  </div>
  <pop-dialog v-model="showDialog">
    <template #title>
      {{ $t('skill') }}
    </template>
    <template #default>
      <FormSkill></FormSkill>
    </template>
  </pop-dialog>
</template>
