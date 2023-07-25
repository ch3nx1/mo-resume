<script setup lang="ts">
const { userInfo } = storeToRefs(useUser())
</script>
<template>
  <div class="flex justify-between px-7">
    <FormEditableInput
      v-model="userInfo.name"
      label="name"
    ></FormEditableInput>
    <FormEditableInput
      v-model="userInfo.jobIntention"
      label="jobIntention"
    ></FormEditableInput>
  </div>
  <div class="flex justify-between px-7">
    <FormEditableInput
      v-model="userInfo.email"
      label="email"
    ></FormEditableInput>
    <FormEditableInput
      v-model="userInfo.phone"
      label="phone"
    ></FormEditableInput>
  </div>
  <div class="flex justify-between px-7">
    <FormEditableInput
      v-model="userInfo.wechat"
      label="wechat"
    ></FormEditableInput>
    <FormEditableInput
      v-model="userInfo.birth"
      label="birth"
    ></FormEditableInput>
  </div>
  <div class="flex justify-between px-7">
    <FormEditableInput
      v-model="userInfo.workY"
      label="workY"
    ></FormEditableInput>
    <FormEditableInput
      v-model="userInfo.location"
      label="location"
    ></FormEditableInput>
  </div>
</template>
<style scoped></style>
