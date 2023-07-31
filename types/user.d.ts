export interface UserInfo {
  name: string
  jobIntention: string
  email: string
  phone: number
  wechat: string
  birth: string
  workY: string
  location: string
}
export interface Skill {
  title: string
  description: Array
  show?: boolean
}
export interface Education {
  school: string
  degree: string
  major: string
  start: string
  end: string
  detail: Array
  show?: boolean
}
export interface Work {
  company: string
  position: string
  city: string
  start: string
  end: string
  detail: string
  show?: boolean
}
