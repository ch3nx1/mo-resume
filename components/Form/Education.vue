<script setup lang="ts">
import { Education } from '~/types/user'

const { educationExperiences, addEdu, deleteEdu, addDetail, deleteDetail } =
  useEducation()

// 增加、删除详情
const titleIndex = ref<number>(0)
const clickTitleAction = {
  add: () => {
    addEdu(titleIndex.value)
  },
  delete: () => {
    deleteEdu(titleIndex.value)
  }
}
// 右键点击记录索引
const getTitleIndex = (i: number) => {
  titleIndex.value = i
}
const getItemIndex = (i: number) => {
  eduDetailIndex.value = i
}
// 增加、删除学校
const eduDetailIndex = ref<number>(0)
const clickItemAction = {
  add: () => {
    addDetail(titleIndex.value, eduDetailIndex.value)
  },
  delete: () => {
    deleteDetail(titleIndex.value, eduDetailIndex.value)
  }
}
/* 展开的技能索引 */
const active = ref<number>(0)
/**
 * 标签实例（v-if后模板引用类型变成一个数组）
 */
const title = ref<Array<HTMLInputElement> | null>(null)
const itemInput = ref<Array<HTMLInputElement> | null>(null)

/**
 * 点击展开，手风琴效果
 * @param e MouseEvent
 * @param skill 技能数据
 * @param index 索引
 */
const onShow = (e: MouseEvent, skill: Education, index: number) => {
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
</script>

<template>
  <div
    v-for="(education, index) in educationExperiences"
    :key="index"
  >
    <label class="label">
      <span class="label-text font-medium px-7 text-gray-400">{{
        $t('school')
      }}</span>
    </label>
    <form-operable :click-action="clickTitleAction">
      <div
        class="flex justify-between cursor-pointer"
        @click="onShow($event, education, index)"
        @click.right="getTitleIndex(index)"
      >
        <aside class="title relative">
          <!-- 输入框跟随内容变化宽度 -->
          <span
            class="inline-block w-full text-lg h-0 invisible px-2 overflow-hidden"
            >{{ education.school }}</span
          >
          <input
            ref="title"
            v-model="education.school"
            type="text"
            class="font-medium text-lg absolute top-0 left-0 border-b border-solid border-gray-300 indent-1 w-full min-w-[125px]"
          />
        </aside>

        <aside class="arrow">
          <nuxt-icon
            v-if="active === index && education.show"
            name="arrow-down"
          ></nuxt-icon>
          <nuxt-icon
            v-else
            name="arrow-right"
          ></nuxt-icon>
        </aside>
      </div>
    </form-operable>
    <div v-show="education.show && index === active">
      <div class="flex justify-between px-7">
        <FormEditableInput
          v-model="education.degree"
          label="degree"
        ></FormEditableInput>
        <FormEditableInput
          v-model="education.major"
          label="major"
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
            v-model="education.start"
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
                    v-model="education.start"
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
            v-model="education.end"
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
                    v-model="education.end"
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
        <button v-show="education.detail.length === 0">
          <nuxt-icon
            name="add"
            class="font-medium text-2xl text-center"
            @click="addDetail(titleIndex, -1)"
          ></nuxt-icon>
        </button>
      </label>
      <form-operable
        v-for="(item, itemIndex) in education.detail"
        :key="itemIndex"
        :click-action="clickItemAction"
        class="detail"
      >
        <input
          ref="itemInput"
          v-model="item.content"
          type="text"
          class="border-[1px] text-base border-gray-200 rounded w-full indent-1"
          @click.right="getItemIndex(itemIndex)"
        />
      </form-operable>
    </div>
  </div>
  <button class="px-7">
    <nuxt-icon
      name="add"
      class="font-medium text-2xl text-center"
      @click="addEdu()"
    ></nuxt-icon>
  </button>
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
