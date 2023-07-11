import { UserInfo } from '~/types/user'

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
  return {
    userInfo
  }
})
