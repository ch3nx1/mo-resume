<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUser } from '~/composables/userInfo'

const { userInfo } = storeToRefs(useUser())
</script>
<template>
  <div class="flex justify-between px-7">
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text font-medium">{{ $t('name') }}</span>
      </label>
      <input
        v-model="userInfo.name"
        type="text"
        :placeholder="$t('nameE')"
        class="input input-bordered w-full max-w-xs"
      />
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text font-medium">{{ $t('jobIntention') }}</span>
      </label>
      <input
        v-model="userInfo.jobIntention"
        type="text"
        :placeholder="$t('jobIntentionE')"
        class="input input-bordered w-full max-w-xs"
      />
    </div>
  </div>
  <div class="flex justify-between px-7">
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text font-medium">{{ $t('email') }}</span>
      </label>
      <input
        v-model="userInfo.email"
        type="text"
        :placeholder="$t('emailE')"
        class="input input-bordered w-full max-w-xs"
      />
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text font-medium">{{ $t('phone') }}</span>
      </label>
      <input
        v-model="userInfo.phone"
        type="text"
        placeholder="13211111111"
        class="input input-bordered w-full max-w-xs"
      />
    </div>
  </div>
  <div class="flex justify-between px-7">
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text font-medium">{{ $t('wechat') }}</span>
      </label>
      <input
        v-model="userInfo.wechat"
        type="text"
        class="input input-bordered w-full max-w-xs"
      />
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text font-medium">{{ $t('birth') }}</span>
      </label>
      <input
        v-model="userInfo.birth"
        type="text"
        class="input input-bordered w-full max-w-xs"
      />
    </div>
  </div>
  <div class="flex justify-between px-7">
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text font-medium">{{ $t('workY') }}</span>
      </label>
      <input
        v-model="userInfo.workY"
        type="text"
        class="input input-bordered w-full max-w-xs"
      />
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text font-medium">{{ $t('location') }}</span>
      </label>
      <input
        v-model="userInfo.location"
        type="text"
        class="input input-bordered w-full max-w-xs"
      />
    </div>
  </div>
</template>
<style scoped>
input {
  background-color: #f8f7fa;
}
input:hover {
  background-color: #eeedf0;
}
</style>
