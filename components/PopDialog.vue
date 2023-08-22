<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
/** 当前组件实例 */
const el = ref<HTMLElement>()
/** 弹出框内容实例 */
const content = ref<HTMLElement>()
/** 关闭按钮实例 */
const closeBtn = ref<HTMLElement>()
const cancelBtn = ref<HTMLElement>()
/** 配合使用transition组件 需控制弹出框内容的显示 */
const showContent = ref<boolean>(false)
/** 定时器类型 */
let timer: NodeJS.Timeout | null = null
/**
 * 监听弹出框组件显示，控制弹出框内容显示
 */
watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      timer = setTimeout(() => {
        showContent.value = true
      }, 0)
    } else {
      showContent.value = false
    }
  }
)
onMounted(() => {
  document.addEventListener('click', getClickPosition)
})
onUnmounted(() => {
  document.removeEventListener('click', getClickPosition)
  clearTimeout(Number(timer))
})
/**
 * 设置内容区域位置
 * @param e mouse event
 */
const getClickPosition = (e: MouseEvent) => {
  if (!props.modelValue || el.value?.contains(e.target as HTMLElement)) return
  const { clientWidth, clientHeight } = el.value!
  const centerX = clientWidth / 2
  const centerY = clientHeight / 2
  const pageX = e.clientX - centerX
  const pageY = e.clientY - centerY
  const x = (pageX / clientWidth) * 100 + 'vw'
  const y = (pageY / clientHeight) * 100 + 'vh'
  setVariable(x, y)
}
/**
 * 设置内容节点偏移位置变量
 * @param x
 * @param y
 */
const setVariable = (x: string, y: string) => {
  const contentEl = content.value
  if (contentEl) {
    contentEl.style.setProperty('--content-x', x)
    contentEl.style.setProperty('--content-y', y)
  }
}

/**
 * 关闭弹窗
 * @param e
 */
const close = (e: MouseEvent) => {
  // 点击遮罩层和关闭按钮关闭弹窗,防止点击content时关闭
  if (
    e.target === el.value ||
    e.target === closeBtn.value ||
    e.target === cancelBtn.value
  ) {
    emit('update:modelValue', false)
  }
}
</script>

<template>
  <transition name="fade">
    <div
      v-show="modelValue"
      ref="el"
      class="flex justify-center z-50 items-center w-full h-screen fixed top-0 left-0 bg-[rgba(0,0,0,.5)]"
      @click.stop="close"
    >
      <transition name="content">
        <div
          v-show="showContent"
          ref="content"
          class="flex flex-col justify-between rounded-sm bg-white max-h-[90vh] text-black w-1/2"
        >
          <header class="relative px-4 py-3 border-b mb-3">
            <h2 class="relative text-lg text-center font-bold">
              <slot name="title"></slot>
            </h2>
            <!-- 阻止事件冒泡.stop -->
            <span
              ref="closeBtn"
              class="btn btn-ghost absolute top-1 right-1 text-base"
              @click.stop="close"
              >X</span
            >
          </header>
          <div class="dialog-body overflow-scroll p-3">
            <slot></slot>
          </div>
          <footer class="flex justify-end p-4">
            <button
              ref="cancelBtn"
              class="btn btn-primary capitalize"
              @click="close"
            >
              {{ $t('cancel') }}
            </button>
          </footer>
        </div>
      </transition>
    </div>
  </transition>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.content-enter-active,
.content-leave-active {
  transition: 0.5s all;
}
.content-enter-from,
.content-leave-to {
  transform: translate(var(--content-x), var(--content-y)) scale(0);
}
</style>
