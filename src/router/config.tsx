import React, { FC, Fragment, Suspense } from 'react'
import { Spin } from 'antd'
import { RouteProps } from '@/types/routes'
import { matchRoutes, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/utils/auth'

// 动态导入
export function lazyLoad(
  Comp: React.LazyExoticComponent<any>
): React.ReactNode {
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      }
    >
      <Comp />
    </Suspense>
  )
}

type AuthProps = {
  children: React.ReactNode
  routes: RouteProps[]
}
// 登陆校验
export const RouterAuth: FC<AuthProps> = ({ children, routes }) => {
  const { isLogin } = useAuth()
  const location = useLocation()

  // 匹配当前层级路由树
  const mathchs = matchRoutes(routes, location)
  // 建议打个断点这里调一下，matchs是返回的层级路由
  // 第一个元素为根路由 最后一个元素为当前路由
  // 所以我们从前往后匹配
  const isNeedLogin = mathchs?.some((item) => {
    const route: RouteProps = item.route

    // 没有配置字段的直接返回
    if (!route.meta) return false
    // 返回是否需要登录
    return route.meta.auth
  })

  if (isNeedLogin && !isLogin) {
    // 跳转到登录  state保存源路由
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  return <Fragment>{children}</Fragment>
}

// 通过用户角色筛选路由
export function screenRoutesByRole(routes: RouteProps[], role: any) {
  return routes
    .map((route) => {
      if (route.meta) {
        const { roles: canIn, unRoles: cantIn } = route.meta

        // 以unRoles 优先
        if (Array.isArray(cantIn) && cantIn.includes(role)) return null

        if (Array.isArray(canIn) && !canIn.includes(role)) return null
      }

      if (route.children)
        route.children = screenRoutesByRole(route.children, role)

      return route
    })
    .filter((i) => i !== null) as RouteProps[]
}
