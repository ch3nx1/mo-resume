<script setup lang="ts">
import { QuasarLanguage } from 'quasar'
// set I18n in Quasar:https://github.com/Maiquu/nuxt-quasar/issues/69#issuecomment-1649392329
const { locale } = useI18n()
const { lang } = useQuasar()

watch(locale, async (newLocale) => {
  const pkg = await getLanguagePack(newLocale)
  lang.set(pkg)
})

async function getLanguagePack(lang: string): Promise<QuasarLanguage> {
  switch (lang) {
    case 'zh-CN':
      return (await import(`quasar/lang/zh-CN.mjs`)).default
    default:
      return (await import(`quasar/lang/en-US.mjs`)).default
  }
}

const language = ref<boolean>()
// change language
watch(
  language,
  (language) => {
    if (language) {
      locale.value = 'en-US'
    } else {
      locale.value = 'zh-CN'
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="navbar bg-base-100 fixed drop-shadow">
    <div class="container mx-auto">
      <div class="flex-1">
        <a
          class="btn btn-ghost normal-case text-xl"
          href="/"
          >{{ $t('title') }}</a
        >
      </div>
      <div class="flex-none">
        <div class="flex items-center justify-center">
          <a href="https://github.com/ch3nx1/mo-resume">
            <nuxt-icon
              name="github"
              class="inline-block hover:text-gray-600 text-3xl mr-3 mb-0"
            ></nuxt-icon>
          </a>
          <label class="swap btn btn-ghost mr-3 btn-text">
            <input
              v-model="language"
              type="checkbox"
            />

            <div class="swap-on flex justify-between">
              <nuxt-icon
                name="language"
                class="text-base inline-block text-center pr-1"
              />
              <span>English</span>
            </div>
            <div class="swap-off flex justify-between">
              <nuxt-icon
                name="language"
                class="text-base inline-block text-center pr-1"
              />
              <span>简体中文</span>
            </div>
          </label>

          <slot name="right" />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
a .nuxt-icon svg {
  margin-bottom: 0;
}
</style>
