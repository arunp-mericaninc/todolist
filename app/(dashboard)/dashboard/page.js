'use client'
import { UserContext } from '@/Context/UserContext'
import SideBar from '@/components/Home/SideBar'
import withAuth from '@/components/Producted/ProductedRoute'
import Task from '@/components/Task/Task'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const Dashboard = () => {
 
  return (
    <div className=''>
      <SideBar/>
      <Task/>
    </div>
  )
}

export default withAuth (Dashboard)
