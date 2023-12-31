<script setup lang="ts">
import { ConcreteComponent } from 'nuxt/dist/app/compat/capi'
import { Simple } from '~/.nuxt/components'
import { DraggableComponent } from '~/types/user'
const simpleTemp = resolveComponent('simple')
const AppHeader = resolveComponent('AppHeader')
const current = ref<string>('simpleTemp')
const componentsName: ConcreteComponent = { simpleTemp, AppHeader }
const template = ref<InstanceType<typeof Simple> | null>(null)

const SimpleHeader = shallowRef(resolveComponent('SimpleHeader'))
const SimpleSkills = shallowRef(resolveComponent('SimpleSkills'))
const SimpleEducation = shallowRef(resolveComponent('SimpleEducation'))
const SimpleExperience = shallowRef(resolveComponent('SimpleExperience'))
const SimpleCustom = shallowRef(resolveComponent('SimpleCustom'))

// ref 不会深度代理shallowRef的对象
const moduleList = ref<Array<DraggableComponent>>([
  { id: 0, component: SimpleHeader, show: true, name: 'header' },
  { id: 1, component: SimpleEducation, show: true, name: 'education' },
  { id: 2, component: SimpleSkills, show: true, name: 'skill' },
  { id: 3, component: SimpleExperience, show: true, name: 'work' }
])
const customComponentIdList = useLocalStorage('customComponentIdList', {
  customId: []
})
onBeforeMount(() => {
  const customComponentCount = customComponentIdList.value.customId.length

  if (customComponentCount) {
    customComponentIdList.value.customId.forEach((item) => {
      moduleList.value.push({
        id: item,
        component: SimpleCustom,
        show: true,
        name:
          // @ts-ignore
          JSON.parse(localStorage.getItem(item.toString()))?.title || 'custom'
      })
    })
  }
})
let customId = +(Math.random() * 100000000).toFixed()
const addComponent = () => {
  moduleList.value.push({
    id: customId,
    component: SimpleCustom,
    show: true,
    name: 'custom'
  })
  // @ts-expect-error
  customComponentIdList.value.customId.push(customId)
  customId += 1
}
const { $on } = useNuxtApp()
$on('delete-custom', (id: number) => {
  moduleList.value.forEach((item, index) => {
    if (item.id === id) {
      moduleList.value.splice(index, 1)
    }
  })
  customComponentIdList.value.customId.forEach((item, index) => {
    if (item === id) {
      customComponentIdList.value.customId.splice(index, 1)
    }
  })
})
$on('modify-title', (modifyTitle) => {
  const { id, title } = modifyTitle
  moduleList.value.forEach((item) => {
    if (item.id === id) {
      item.name = title
    }
  })
})

const exporting = ref<boolean>(false)
const downloadPDF = async () => {
  exporting.value = true
  // @ts-expect-error
  const html2pdf = (await import('html2pdf.js')).default
  html2pdf()
    .set({
      margin: 0,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {},
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      // pagebreak: {
      //   mode: ['avoid-all', 'css', 'legacy']
      // }
    })
    .from(document.getElementById('resume-container'))
    .save('resume')
  setTimeout(() => {
    exporting.value = false
  }, 1000)
}
const resetData = () => {
  localStorage.clear()
  location.reload()
}

function reader(file: File) {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = function () {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
const imgSrc = useLocalStorage('base64Img', '')
const uploadAvatar = async (e: Event) => {
  const { files } = e.target as HTMLInputElement
  const content: string = (await reader(files![0])) as string
  imgSrc.value = content
}
const isAvatar = ref<boolean>()
watchEffect(() => {
  if (imgSrc?.value) {
    isAvatar.value = true
  } else {
    isAvatar.value = false
  }
})
provide('imgSrc', imgSrc)
provide('isAvatar', isAvatar)
</script>

<template>
  <div class="bg-slate-100 h-full">
    <div
      id="resume-container"
      class="mx-auto w-[800px] pb-16 bg-white card card-compact shadow-md rounded-sm"
    >
      <component
        :is="componentsName[current]"
        ref="template"
        :module-list="moduleList"
      />
    </div>
    <div
      class="fixed top-0 right-0 bottom-0 w-[10vw] min-w-[280px] max-w-[480px] flex flex-col"
    >
      <q-list class="h-full">
        <q-item
          clickable
          class="bg-white shadow-md rounded-md m-1"
          @click="downloadPDF"
        >
          <QInnerLoading :showing="exporting">
            <QSpinnerPie color="primary" />
          </QInnerLoading>
          <q-item-section avatar>
            <nuxt-icon
              name="pdf"
              class="text-3xl"
            ></nuxt-icon>
          </q-item-section>
          <q-item-section>
            {{ $t('downloadPDF') }}
          </q-item-section>
        </q-item>
        <q-item
          clickable
          class="bg-white shadow-md rounded-md m-1"
          @click="resetData"
        >
          <q-item-section avatar>
            <nuxt-icon
              name="reset"
              class="text-3xl"
            ></nuxt-icon>
          </q-item-section>
          <q-item-section>
            {{ $t('reset') }}
          </q-item-section>
        </q-item>
        <q-item
          clickable
          class="bg-white shadow-md rounded-md m-1 relative"
        >
          <input
            type="file"
            class="absolute cursor-pointer h-full top-0 left-0 opacity-0"
            accept=".png, .jpg, .jpeg"
            @change="uploadAvatar"
          />
          <q-item-section avatar>
            <nuxt-icon
              name="avatar"
              class="text-3xl"
            ></nuxt-icon>
          </q-item-section>
          <q-item-section>
            {{ $t('addAvatar') }}
          </q-item-section>
        </q-item>
        <q-item class="bg-white shadow-md rounded-md m-1 relative">
          <q-item-section>
            <q-item-label>{{ $t('showAvatar') }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle v-model="isAvatar" />
          </q-item-section>
        </q-item>
        <QExpansionItem
          default-opened
          class="bg-white shadow-md rounded-md m-1"
        >
          <template #header>
            <QItemSection avatar>
              <nuxt-icon
                name="setting"
                class="text-3xl"
              ></nuxt-icon>
            </QItemSection>
            <QItemSection>
              {{ $t('setting') }}
            </QItemSection>
          </template>
          <QList>
            <q-item
              v-for="item in moduleList"
              :key="item.id"
              v-ripple
              tag="label"
            >
              <q-item-section>
                <q-item-label>{{ $t(item.name) }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-toggle v-model="item.show" />
              </q-item-section>
            </q-item>
            <q-item
              v-ripple
              clickable
              @click="addComponent"
            >
              <q-item-section>
                {{ $t('addCustom') }}
              </q-item-section>
              <q-item-section avatar>
                <nuxt-icon
                  name="add"
                  class="text-3xl"
                ></nuxt-icon>
              </q-item-section>
            </q-item>
          </QList>
        </QExpansionItem>
      </q-list>
    </div>
  </div>
</template>
<style>
.q-item__section .nuxt-icon svg {
  margin-bottom: 0;
}
.q-item__section .nuxt-icon {
  padding: 0 12px;
}
</style>
