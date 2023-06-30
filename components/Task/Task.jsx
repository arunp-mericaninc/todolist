import React from 'react'

const Task = ({task}) => {
    console.log(task);
  return (
    <div className='flex gap-2 flex-col '>
      {task.map((item, i)=>{
        return(
            <div key={i} className='flex justify-between items-center border-2 gap-1 p-2 hover:bg-slate-50 bg-slate-200'>
                <h2>{item.title}</h2>
                <h3>{item.description}</h3>
                <button className='bg-green-600 p-1 rounded-md'>Edit</button>
                <button className='bg-red-600 p-1 rounded-md text-white'>Delete</button>
            </div>
        )
      })}
    </div>
  )
}

export default Task
