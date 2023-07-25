import { Education } from '~/types/user'

export const useEducation = defineStore('education', () => {
  const educationExperiences = ref<Education[]>([
    {
      school: 'XX大学',
      degree: '本科',
      major: '计算机与科学',
      start: '2020/09/01',
      end: '2024/06/30',
      detail: [{ content: '获得了XXX' }, { content: '参与了XXX' }],
      show: true
    },
    {
      school: 'XX大学',
      degree: '研究生',
      major: '计算机与科学',
      start: '2024/09/01',
      end: '2027/06/30',
      detail: [{ content: '获得了XXX' }, { content: '参与了XXX' }],
      show: false
    }
  ])
  const deleteEdu = (i: number) => {
    educationExperiences.value.splice(i, 1)
    if (educationExperiences.value.length < 1) {
      educationExperiences.value.push({
        school: '',
        detail: [],
        degree: '',
        start: '',
        end: '',
        major: '',
        show: true
      })
    }
  }
  const addEdu = (i: number) => {
    educationExperiences.value.splice(i + 1, 0, {
      school: '',
      detail: [{ content: '' }],
      degree: '',
      start: '',
      end: '',
      major: '',
      show: false
    })
  }
  const deleteDetail = (i: number, descI: number) => {
    educationExperiences.value[i].detail.splice(descI, 1)
  }
  const addDetail = (i: number, descI: number) => {
    educationExperiences.value[i].detail.splice(descI + 1, 0, { content: '' })
  }

  return { educationExperiences, deleteEdu, addEdu, deleteDetail, addDetail }
})
