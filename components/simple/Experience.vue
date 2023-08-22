<script setup lang="ts">
const { workExperiences } = storeToRefs(useWork())
const showDialog = ref<boolean>(false)
defineProps<{
  isShow: boolean
}>()
</script>
<template>
  <div
    v-show="isShow"
    class="px-8 overflow-hidden cursor-move hover:bg-slate-200 hover:border-dashed hover:border hover:border-blue-400"
    @click="showDialog = true"
  >
    <FormTitle :title="$t('work')"></FormTitle>
    <div
      v-for="(work, index) in workExperiences"
      :key="index"
    >
      <div class="flex justify-between">
        <div>
          <span class="text-base font-semibold mr-1">{{ work.company }}</span
          ><span class="mr-1"> </span
          ><span class="text-gray-400">{{ work.position }}</span>
        </div>
        <div>
          <span class="text-gray-400 mr-1">
            <nuxt-icon
              name="location"
              class="inline-block align-middle"
            ></nuxt-icon>
            {{ work.city }}
          </span>
          <span>{{ work.start }}</span> - <span>{{ work.end }}</span>
        </div>
      </div>
      <div class="p-3">
        <div v-html="work.detail"></div>
      </div>
    </div>
  </div>
  <pop-dialog v-model="showDialog">
    <template #title>
      {{ $t('work') }}
    </template>
    <template #default>
      <FormExperience></FormExperience>
    </template>
  </pop-dialog>
</template>
