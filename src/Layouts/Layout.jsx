import React from 'react'
import AsideBar from '../components/AsideBar/AsideBar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
        <AsideBar/>
        <Outlet/>
    </div>
  )
}
