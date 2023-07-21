import { Skill, UserInfo } from '~/types/user'

export const useUser = defineStore('userInfo', () => {
  const userInfo = ref<UserInfo>({
    birth: '1998/07',
    email: 'xxx@xx.com',
    jobIntention: '前端工程师',
    location: '北京',
    name: '张三',
    phone: 13211111111,
    wechat: 'wechat',
    workY: '3年'
  })
  const skills = ref<Array<Skill>>([
    {
      title: '熟练使用JavaScript',
      description: [
        { content: 'vue2/vue3' },
        { content: 'nuxt3' },
        { content: 'typescript' }
      ],
      show: false
    },
    {
      title: '熟练使用Html/Css',
      description: [
        { content: 'HTMl5/CSS3' },
        { content: 'less/sass' },
        { content: 'tailwind' }
      ],
      show: false
    }
  ])
  const deleteSkill = (i: number) => {
    skills.value.splice(i, 1)
  }
  const addSkill = (i: number) => {
    skills.value.splice(i + 1, 0, {
      title: '',
      description: [{ content: '' }],
      show: false
    })
  }
  const deleteDescription = (i: number, descI: number) => {
    skills.value[i].description.splice(descI, 1)
  }
  const addDescription = (i: number, descI: number) => {
    skills.value[i].description.splice(descI + 1, 0, { content: '' })
  }
  return {
    userInfo,
    skills,
    deleteSkill,
    addSkill,
    deleteDescription,
    addDescription
  }
})
