<script setup lang="ts">
import { useUser } from '~/composables/userInfo'

const showDialog = ref<boolean>(false)
const { userInfo } = storeToRefs(useUser())
defineProps<{
  isShow: boolean
}>()
const isAvatar = inject('isAvatar')
const imgSrc: Ref | undefined = inject('imgSrc') || undefined
// onBeforeMount(() => {
//   if (imgSrc.value) {
//     isAvatar.value = true
//   } else {
//     isAvatar.value = false
//   }
// })
</script>
<template>
  <div
    v-show="isShow"
    class="bg-emerald-600 text-white p-8 mx--4 cursor-move hover:bg-emerald-700 hover:border-dashed hover:border hover:border-blue-400"
    @click="showDialog = true"
  >
    <div
      class="flex justify-between pb-4 px-2 border-b-[0.5px]"
      style="border-color: rgba(65, 125, 94, 0.9)"
    >
      <div class="flex flex-nowrap items-center">
        <q-avatar
          v-show="isAvatar"
          size="77px"
          font-size="16px"
          class="mr-3"
        >
          <img
            :src="imgSrc"
            alt="请上传"
        /></q-avatar>
        <div class="text-4xl leading-8">
          {{ userInfo.name }}
        </div>
      </div>
      <div class="text-2xl leading-8 flex items-center">
        {{ userInfo.jobIntention }}
      </div>
    </div>
    <div class="pt-4">
      <div class="flex justify-between">
        <div>
          <nuxt-icon
            name="email"
            class="inline-block align-middle pr-1"
          />
          <span>{{ userInfo.email }}</span>
        </div>
        <div>
          <nuxt-icon
            name="phone"
            class="inline-block align-middle pr-1"
          />
          <span>{{ userInfo.phone }}</span>
        </div>
      </div>
      <div class="flex justify-between">
        <div>
          <nuxt-icon
            name="wechat"
            class="inline-block align-middle pr-1"
          />
          <span>{{ userInfo.wechat }}</span>
        </div>
        <div>
          <nuxt-icon
            name="birthday"
            class="inline-block align-middle pr-1"
          />
          <span>{{ userInfo.birth }}</span>
        </div>
      </div>
      <div class="flex justify-between">
        <div>
          <nuxt-icon
            name="info"
            class="inline-block align-middle pr-1"
          />
          <span>{{ userInfo.workY }}</span>
        </div>
        <div>
          <nuxt-icon
            name="location"
            class="inline-block align-middle pr-1"
          />
          <span>{{ userInfo.location }}</span>
        </div>
      </div>
    </div>
    <pop-dialog v-model="showDialog">
      <template #title>
        {{ $t('info') }}
      </template>
      <template #default>
        <FormInfo></FormInfo>
      </template>
    </pop-dialog>
  </div>
</template>
