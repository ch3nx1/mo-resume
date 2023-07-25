<script setup lang="ts">
import { Skill } from '~/types/user'
const { skills } = storeToRefs(useUser())
// 增加、删除技能
const { addSkill, deleteSkill, deleteDescription, addDescription } = useUser()
const titleIndex = ref<number>(0)
const clickTitleAction = {
  add: () => {
    addSkill(titleIndex.value)
  },
  delete: () => {
    deleteSkill(titleIndex.value)
  }
}
// 右键点击记录索引
const getTitleIndex = (i: number) => {
  titleIndex.value = i
}
const getItemIndex = (i: number) => {
  skillItemIndex.value = i
}
// 增加、删除技能项
const skillItemIndex = ref<number>(0)
const clickItemAction = {
  add: () => {
    addDescription(titleIndex.value, skillItemIndex.value)
  },
  delete: () => {
    deleteDescription(titleIndex.value, skillItemIndex.value)
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
const onShow = (e: MouseEvent, skill: Skill, index: number) => {
  // 确保点击输入框时不展示
  if (e.target !== title.value![index]) {
    if (index === active.value) {
      skill.show = !skill.show
    } else {
      skill.show = true
    }
    active.value = index
    // 展开技能项时记录技能title的索引，以便删除指定技能项
    titleIndex.value = index
  }
}
</script>

<template>
  <div
    v-for="(skill, index) in skills"
    :key="index"
  >
    <form-operable :click-action="clickTitleAction">
      <div
        class="flex justify-between cursor-pointer"
        @click="onShow($event, skill, index)"
        @click.right="getTitleIndex(index)"
      >
        <aside class="title relative">
          <!-- 输入框跟随内容变化宽度 -->
          <span
            class="inline-block text-lg w-full h-0 invisible px-2 overflow-hidden"
            >{{ skill.title }}</span
          >
          <input
            ref="title"
            v-model="skill.title"
            type="text"
            class="font-medium text-lg absolute top-0 left-0 border-b border-solid border-gray-300 indent-1 w-full min-w-[125px]"
          />
        </aside>

        <aside class="arrow">
          <nuxt-icon
            v-if="active === index && skill.show"
            name="arrow-down"
          ></nuxt-icon>
          <nuxt-icon
            v-else
            name="arrow-right"
          ></nuxt-icon>
        </aside>
      </div>
    </form-operable>
    <button
      v-show="skill.show && index === active && skill.description.length === 0"
      class="px-7"
    >
      <nuxt-icon
        name="add"
        class="font-medium text-2xl text-center"
        @click="addDescription(titleIndex, -1)"
      ></nuxt-icon>
    </button>
    <form-operable
      v-for="(item, itemIndex) in skill.description"
      v-show="skill.show && index === active"
      :key="item"
      :click-action="clickItemAction"
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
</template>
<style>
.arrow .nuxt-icon svg {
  display: inline-block;
  font-size: 27px;
  line-height: 28px;
}
</style>
