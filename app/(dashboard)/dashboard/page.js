'use client'
import { UserContext } from '@/Context/UserContext'
import SideBar from '@/components/Home/SideBar'
import Task from '@/components/Task/Task'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const page = () => {
  const {user}= useContext(UserContext)
  const router = useRouter()
  return (
    <div className=''>
      {user?<SideBar/>:router.push("/")}
      <Task/>
    </div>
  )
}

export default page
