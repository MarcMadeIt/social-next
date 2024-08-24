import Image from 'next/image'
import React from 'react'
import { FaEllipsisH } from 'react-icons/fa'

const Ads = ({size} :{size: "sm" | "md" | "lg" }) => {
  return (
    
      <div className='p-3 flex flex-col gap-5 bg-foreground rounded-xl shadow-xl text13'>
        <div className='flex justify-between text-primary'>
            <span>Sponsored Ads</span>
            <FaEllipsisH size={18} />
        </div>
        {/* Requests */}
        <div className={`flex flex-col mt-4 ${size === "sm" ? "gap-2": "gap-4"}`}>
            <div className={`relative w-full ${size=== "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"}`}>
              <Image src="/ads.jpg" alt='' fill className='object-cover rounded-lg'  />
            </div>
          <div className='flex gap-2'>
            <Image src="/maxizoo.png" alt='' width={18} height={18} className='rounded-sm' />
            <span className='text-primary font-medium cursor-pointer'>Maxi Zoo</span>
          </div>
          <p className={`text-text ${size==="sm" ? "text10" : "text11"}`}>Highway exchange secret loose studied stick population brief might chapter queen knowledge</p>
        </div>
        {/* UPCOMING */}
        <div className="">
        <button className=' cursor-pointer w-full py-2 bg-background ring ring-placeholder text-extra rounded-lg font-semibold lg:hover:ring-extra lg:hover:text-secondary lg:transition-all lg:duration-500'>See more</button>
        </div>
    </div>
  )
}

export default Ads