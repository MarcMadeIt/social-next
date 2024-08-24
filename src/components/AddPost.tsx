"use client"

import Image from 'next/image'
import React from 'react'
import { FaPaperclip, FaPhotoFilm, FaRegFaceGrinBeam } from 'react-icons/fa6'
import SavedModal from './SavedModal'


const AddPost = () => {

    

  return (
    <div className='p-2 flex flex-col '>
        {/*Top*/}
        <div className='flex justify-between items-center'>
            {/*ProfilePic*/}
            <div className='w-[15%] md:w-[10%] flex'>
                <Image src="/cat.jpg" alt='' className='ring-2 ring-placeholder rounded-lg w-10 h-10 md:w-14 md:h-14 object-cover' width={80} height={80} />
            </div>
             {/*PostMessage*/}
            <form action="" className='w-[85%] md:w-[90%] p-2 flex items-center gap-1 bg-foreground rounded-lg relative '>
                <textarea placeholder="What do you have on mind?" className='outline-none bg-transparent p-1 resize-none w-full placeholder-placeholder' name='desc' />

                <div className='flex items-center gap-5'>
                <FaRegFaceGrinBeam className='text-extra cursor-pointer' size={20} />
                <button className='btn' type='submit'>Send</button>
                </div>
             </form>
            
             
        </div>
        {/*Bottom*/}
        <div className='flex'>
            <div className='w-[15%] md:w-[10%]'>

            </div>
              {/*Upload files*/}
            <div className='flex text-primary w-[100%] md:w-[90%] gap-2 py-2'>

                <div className='relative'>
                    <input type="file" id='img' className='z-3' hidden />
                    <label htmlFor="img" className='flex items-center gap-1 cursor-pointer label-post p-2'>
                        <FaPhotoFilm />
                        <span className='text12'>Photo/Video</span>
                    </label>
                </div>

                <div className='relative'>
                    <input type="file" id="file" className='text-[11px]' hidden  />
                    <label htmlFor="file" className='flex items-center gap-1 cursor-pointer label-post p-2'>
                        <FaPaperclip />
                        <span className='text12'>Document</span>
                    </label>
                </div>

                <div className='relative z-20'>
                    <SavedModal />
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddPost