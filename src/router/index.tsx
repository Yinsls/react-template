import { USER_ROLE_ENUM } from '@/constants/user'
import { RouteProps } from '@/types/routes'
import React from 'react'
import { lazyLoad } from './config'

export const routes: RouteProps[] = [
  {
    path: '/',
    children: [
      {
        path: 'home',
        meta: {
          auth: true,
          roles: [USER_ROLE_ENUM.ADMIN],
        },
        element: lazyLoad(React.lazy(() => import('@/pages/home/index'))),
      },
      {
        path: 'test',
        element: lazyLoad(React.lazy(() => import('@/pages/test/index'))),
      },
      {
        path: ':userId',
        element: lazyLoad(React.lazy(() => import('@/pages/user/index'))),
      },
    ],
  },
  {
    path: '/login',
    element: lazyLoad(React.lazy(() => import('@/pages/login/index'))),
  },
  {
    path: '*',
    element: lazyLoad(React.lazy(() => import('@/pages/error/404'))),
  },
]
