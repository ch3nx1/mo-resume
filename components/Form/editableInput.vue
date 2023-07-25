<script setup lang="ts">
defineProps<{
  modelValue: any
  label: string
}>()
defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text font-medium text-gray-400">{{ $t(label) }}</span>
    </label>
    <input
      :value="modelValue"
      type="text"
      class="input input-bordered w-full max-w-xs"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
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
