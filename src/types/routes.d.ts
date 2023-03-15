import type { RouteObject } from 'react-router-dom'
import { USER_ROLE_ENUM } from '@/constants/user'

// 扩展Route定义
export interface RouteProps extends RouteObject {
  title?: string // 页面标题
  hidden?: boolean // 是否显示菜单， 默认显示
  icon?: string // 菜单icon
  redirect?: string // 重定向路由
  meta?: {
    auth?: boolean
    roles?: USER_ROLE_ENUM[]
    unRoles?: USER_ROLE_ENUM[]
  }
  children?: RouteProps[]
}
