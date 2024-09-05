"use client"


import React, { useState } from 'react'
import { User } from '../../../prisma/generated/client';

const UpdateUser = ({user}:{user: User}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <span onClick={()=>setOpen(true)} className='cursor-pointer'>Update</span>
      {open && (<div className='absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50 '>
        <form action="" className='bg-background p-12 rounded-md shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3' >
        <div className='absolute' onClick={handleClose}></div>
        </form>

      </div>)}
    </div>
  )
}

export default UpdateUser