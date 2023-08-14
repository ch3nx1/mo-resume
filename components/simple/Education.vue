<script setup lang="ts">
const { educationExperiences } = storeToRefs(useEducation())
const showDialog = ref<boolean>(false)
defineProps<{
  isShow: boolean
}>()
</script>
<template>
  <div
    v-show="isShow"
    class="px-8 overflow-hidden cursor-pointer hover:bg-slate-200 hover:border-dashed hover:border hover:border-blue-400"
    @click="showDialog = true"
  >
    <FormTitle :title="$t('education')"></FormTitle>
    <div
      v-for="(education, index) in educationExperiences"
      :key="index"
    >
      <div class="flex justify-between">
        <div>
          <nuxt-icon
            name="school"
            class="inline-block align-middle mr-1"
          ></nuxt-icon>
          <span class="text-base font-semibold mr-1">{{
            education.school
          }}</span
          ><span class="mr-1">-</span
          ><span class="text-base font-normal mr-1">{{ education.degree }}</span
          ><span class="text-gray-400">{{ education.major }}</span>
        </div>
        <div>
          <span>{{ education.start }}</span> - <span>{{ education.end }}</span>
        </div>
      </div>
      <div class="pt-3">
        <ul class="list-decimal px-6">
          <li
            v-for="(item, i) in education.detail"
            :key="i"
          >
            {{ item.content }}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <pop-dialog v-model="showDialog">
    <template #title>
      {{ $t('education') }}
    </template>
    <template #default>
      <FormEducation></FormEducation>
    </template>
  </pop-dialog>
</template>
