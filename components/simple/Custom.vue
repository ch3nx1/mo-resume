<script setup lang="ts">
const showDialog = ref<boolean>(false)
const content = ref<string>('')

const title = ref<string>('自定义模块')
const titleInput = ref<HTMLInputElement | null>(null)
const showEditIcon = ref<boolean>(true)
// 富文本编辑器配置
const $q = useQuasar()
const toolbar = [
  ['bold', 'underline', 'italic', 'link', 'hr'],
  ['token', 'custom_btn'],
  [
    {
      label: $q.lang.editor.formatting,
      icon: $q.iconSet.editor.formatting,
      list: 'no-icons',
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
    },
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: 'no-icons',
      options: [
        'size-1',
        'size-2',
        'size-3',
        'size-4',
        'size-5',
        'size-6',
        'size-7'
      ]
    },
    'removeFormat'
  ],
  ['unordered', 'ordered'],

  ['undo', 'redo'],
  ['viewsource']
]
const showDeleteBtn = ref<boolean>(false)
defineEmits<{
  'delete-custom': [id: number]
}>()
defineProps<{
  customKey: number
}>()
</script>
<template>
  <div
    class="px-8 relative cursor-pointer hover:bg-slate-200 hover:border-dashed hover:border hover:border-blue-400"
    @click="showDialog = true"
    @mouseenter="showDeleteBtn = true"
    @mouseleave="showDeleteBtn = false"
  >
    <FormTitle :title="title"></FormTitle>
    <div class="p-3">
      <div v-html="content"></div>
    </div>
    <div
      v-show="showDeleteBtn"
      class="btn bg-emerald-600 w-[46px] p-0 text-white h-[46px] absolute top-0 z-10 right-[-46px] hover:bg-emerald-700"
      @click.stop="$emit('delete-custom', customKey)"
    >
      <nuxt-icon
        name="delete"
        class="text-2xl"
      ></nuxt-icon>
      <q-tooltip
        anchor="bottom middle"
        self="center middle"
      >
        {{ $t('delete') }}
      </q-tooltip>
    </div>
  </div>

  <pop-dialog v-model="showDialog">
    <template #title>
      <input
        ref="titleInput"
        v-model="title"
        class="text-center"
        type="text"
        @focus="showEditIcon = false"
        @blur="showEditIcon = true"
      />
      <nuxt-icon
        v-show="showEditIcon"
        name="edit"
        class="absolute left-[435px] top-[17px] cursor-pointer"
        @click="titleInput?.focus()"
      />
    </template>
    <template #default>
      <div class="q-pa-md q-gutter-sm">
        <q-editor
          v-model="content"
          :dense="$q.screen.lt.md"
          :toolbar="toolbar"
        />
      </div>
    </template>
  </pop-dialog>
</template>