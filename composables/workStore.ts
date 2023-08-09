import { Work } from '~/types/user'

export const useWork = defineStore(
  'workExperiences',
  () => {
    const workExperiences = ref<Work[]>([
      {
        company: 'xxx科技公司',
        position: '前端开发工程师',
        start: '2023/03/01',
        end: '2024/03/01',
        city: '北京',
        detail:
          '<h3>项目经验</h3><h4>xxx管理系统</h4><div><ul><li>实现了xxx</li><li>通过xxx，达成了xxx</li><li>优化了xxx，节省里xxx</li></ul></div>',
        show: true
      }
    ])
    const deleteWork = (i: number) => {
      workExperiences.value.splice(i, 1)
      if (workExperiences.value.length < 1) {
        workExperiences.value.push({
          company: '',
          detail: '',
          position: '',
          start: '',
          end: '',
          city: '',
          show: true
        })
      }
    }
    const addWork = (i?: number) => {
      if (i === undefined) {
        workExperiences.value.push({
          company: '',
          detail: '',
          position: '',
          start: '',
          end: '',
          city: '',
          show: false
        })
      } else {
        workExperiences.value.splice(i + 1, 0, {
          company: '',
          detail: '',
          position: '',
          start: '',
          end: '',
          city: '',
          show: true
        })
      }
    }
    return {
      workExperiences,
      deleteWork,
      addWork
    }
  },
  { persist: true }
)
