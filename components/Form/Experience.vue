<script setup lang="ts">
import { useQuasar } from 'quasar'
import { Work } from '~/types/user'
const { workExperiences } = storeToRefs(useWork())
const { addWork, deleteWork } = useWork()

// 增加、删除详情
const titleIndex = ref<number>(0)
const clickTitleAction = {
  add: () => {
    addWork(titleIndex.value)
  },
  delete: () => {
    deleteWork(titleIndex.value)
  }
}
// 右键点击记录索引
const getTitleIndex = (i: number) => {
  titleIndex.value = i
}

/* 展开的索引 */
const active = ref<number>(0)
/**
 * 标签实例（v-if后模板引用类型变成一个数组）
 */
const title = ref<Array<HTMLInputElement> | null>(null)

/**
 * 点击展开，手风琴效果
 * @param e MouseEvent
 * @param skill 技能数据
 * @param index 索引
 */
const onShow = (e: MouseEvent, skill: Work, index: number) => {
  // 确保点击输入框时不展示
  if (e.target !== title.value![index]) {
    if (index === active.value) {
      skill.show = !skill.show
    } else {
      skill.show = true
    }
    active.value = index
    titleIndex.value = index
  }
}
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
</script>

<template>
  <div
    v-for="(work, index) in workExperiences"
    :key="index"
  >
    <label class="label">
      <span class="label-text font-medium px-7 text-gray-400">{{
        $t('company')
      }}</span>
    </label>
    <form-operable :click-action="clickTitleAction">
      <div
        class="flex justify-between cursor-pointer"
        @click="onShow($event, work, index)"
        @click.right="getTitleIndex(index)"
      >
        <aside class="title relative">
          <!-- 输入框跟随内容变化宽度 -->
          <span
            class="inline-block w-full text-lg h-0 invisible px-2 overflow-hidden"
            >{{ work.company }}</span
          >
          <input
            ref="title"
            v-model="work.company"
            type="text"
            class="font-medium text-lg absolute top-0 left-0 border-b border-solid border-gray-300 indent-1 w-full min-w-[125px]"
          />
        </aside>

        <aside class="arrow">
          <nuxt-icon
            v-if="active === index && work.show"
            name="arrow-down"
          ></nuxt-icon>
          <nuxt-icon
            v-else
            name="arrow-right"
          ></nuxt-icon>
        </aside>
      </div>
    </form-operable>
    <div v-show="work.show && index === active">
      <div class="flex justify-between px-7">
        <FormEditableInput
          v-model="work.position"
          label="position"
        ></FormEditableInput>
        <FormEditableInput
          v-model="work.city"
          label="location"
        ></FormEditableInput>
      </div>
      <div class="datePicker flex justify-between px-7">
        <div>
          <label class="label">
            <span class="label-text font-medium text-gray-400">{{
              $t('start')
            }}</span>
          </label>
          <q-input
            v-model="work.start"
            mask="date"
            :rules="['date']"
            class="input input-bordered w-[320px] max-w-xs bg-[#f8f7fa] hover:bg-[#eeedf0]"
          >
            <template #append>
              <q-icon
                name="event"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="work.start"
                    minimal
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Close"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div>
          <label class="label">
            <span class="label-text font-medium text-gray-400">{{
              $t('end')
            }}</span>
          </label>
          <q-input
            v-model="work.end"
            mask="date"
            :rules="['date']"
            class="input input-bordered w-[320px] max-w-xs bg-[#f8f7fa] hover:bg-[#eeedf0]"
          >
            <template #append>
              <q-icon
                name="event"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="work.end"
                    minimal
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Close"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <label class="label px-7">
        <span class="label-text font-medium text-gray-400">{{
          $t('detail')
        }}</span>
      </label>
      <div class="q-pa-md q-gutter-sm">
        <q-editor
          v-model="work.detail"
          :dense="$q.screen.lt.md"
          :toolbar="toolbar"
        />
      </div>
    </div>
  </div>
</template>
<style>
.arrow .nuxt-icon svg {
  display: inline-block;
  font-size: 27px;
  line-height: 28px;
}
.q-field__control {
  height: 48px;
}
.q-date__view.q-date__months.flex.flex-center {
  flex-wrap: wrap;
}
</style>
