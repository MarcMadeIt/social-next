import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { LuPartyPopper } from 'react-icons/lu'
import { MdCelebration } from 'react-icons/md'

const Birthdays = () => {
  return (
    <div className='p-3 flex flex-col gap-5 bg-foreground rounded-xl shadow-xl text13'>
        <div className='flex justify-between text-primary'>
            <span>Birtdays</span>
        </div>
        {/* Requests */}
        <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
                <div className='flex gap-2 items-center'>
                    <Image src="/cat3.jpg" alt='' width={18} height={18} className='h-5 w-5 rounded-md' />
                    <p className='cursor-pointer text12 text-extra py-1 px-2 bg-user rounded-md font-semibold'><span className='text-lg leading-3'>@</span>Flexi</p>
                </div>
                <div className='flex gap-2'>
                    <button className='btn-cta-light'>Celebrate</button>
                </div>
            </div>

        </div>
        {/* UPCOMING */}
        <div className='p-4 bg-background rounded-lg flex items-center gap-3'>
        <LuPartyPopper size={34} className='text-primary' />
        <Link href="/" className='flex flex-col gap-1 text-xs'>
        <span className='text-primary font-semibold'>Upcoming Birtdays</span>
        <span>See other 9 there soon have birtday</span>
        </Link>
        </div>
    </div>
  )
}

export default Birthdays