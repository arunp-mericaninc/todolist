'use client'
import { UserContext } from '@/Context/UserContext'
import SideBar from '@/components/Home/SideBar'
import Task from '@/components/Task/Task'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const Dashboard = () => {
  const {User}= useContext(UserContext)
  const router = useRouter()
  return (
    <div className=''>
      {User?<SideBar/>:router.push("/")}
      <Task/>
    </div>
  )
}

export default Dashboard
