import Image from 'next/image'
import React from 'react'

const Stories = () => {
  return (
    <div className='text-[12px] shadow-md overflow-scroll p-2 scrollbar-hide'>
        <div className='flex gap-6 w-max '>
            <div className="flex flex-col gap-2 items-center"> 
                <Image className='rounded-xl ring-4 ring-primary w-18 h-26 object-cover' src="/story.jpg" alt='' width={80} height={60} /> 
                <span>My Story</span>  
            </div>
            <div className="flex flex-col gap-2 items-center"> 
                <Image className='rounded-xl ring-4 ring-placeholder w-18 h-26 object-cover' src="/story.jpg" alt='' width={80} height={60} /> 
                <span>Bob</span>  
            </div>
            <div className="flex flex-col gap-2 items-center"> 
                <Image className='rounded-xl ring-4 ring-placeholder w-18 h-26 object-cover' src="/story.jpg" alt='' width={80} height={60} /> 
                <span>John</span>  
             </div>
            <div className="flex flex-col gap-2 items-center"> 
                <Image className='rounded-xl ring-4 ring-placeholder w-18 h-26 object-cover' src="/story.jpg" alt='' width={80} height={60} /> 
                <span>Nell</span>  
            </div>
            <div className="flex flex-col gap-2 items-center"> 
                <Image className='rounded-xl ring-4 ring-placeholder w-18 h-26 object-cover' src="/story.jpg" alt='' width={80} height={60} /> 
                <span>Mason</span>  
            </div>
            <div className="flex flex-col gap-2 items-center"> 
                <Image className='rounded-xl ring-4 ring-placeholder w-18 h-26 object-cover' src="/story.jpg" alt='' width={80} height={60} /> 
                <span>Lelia</span>  
            </div>
            <div className="flex flex-col gap-2 items-center"> 
                <Image className='rounded-xl ring-4 ring-placeholder w-18 h-26 object-cover' src="/story.jpg" alt='' width={80} height={60} /> 
                <span>Frederick</span>  
            </div>
            <div className="flex flex-col gap-2 items-center"> 
                <Image className='rounded-xl ring-4 ring-placeholder w-18 h-26 object-cover' src="/story.jpg" alt='' width={80} height={60} /> 
                <span>Frederick</span>  
            </div>
            <div className="flex flex-col gap-2 items-center"> 
                <Image className='rounded-xl ring-4 ring-placeholder w-18 h-26 object-cover' src="/story.jpg" alt='' width={80} height={60} /> 
                <span>Frederick</span>  
            </div>
            <div className="flex flex-col gap-2 items-center"> 
                <Image className='rounded-xl ring-4 ring-placeholder w-18 h-26 object-cover' src="/story.jpg" alt='' width={80} height={60} /> 
                <span>Frederick</span>  
            </div>
        </div>
    </div>
  )
}

export default Stories