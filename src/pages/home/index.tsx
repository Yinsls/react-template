import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <div>home内容</div>
      <Outlet />
    </div>
  )
}
