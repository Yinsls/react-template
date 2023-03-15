import React, { FC, useMemo } from 'react'
import { useRoutes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { cloneDeep } from 'lodash'
import { RouterAuth, screenRoutesByRole } from '@/router/config'
import { routes } from '@/router'

const App: FC = () => {
  const { role } = useSelector((state: any) => state.user)
  const curRoutes: any = useMemo(() => {
    return screenRoutesByRole(cloneDeep(routes), role)
  }, [role])

  const Element = useRoutes(curRoutes)

  return <RouterAuth routes={routes}>{Element}</RouterAuth>
}

export default App
