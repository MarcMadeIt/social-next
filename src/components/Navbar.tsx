"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { FaComments, FaHouse, FaRegCalendarDays, FaSquarePlus } from 'react-icons/fa6'
import OptionsModal from './OptionsModal';

const Navbar = () => {
  const pathname = usePathname();
  const [petOptions, setPetOptions] = useState(false);

  const handlePawToggle = () => {
    setPetOptions((prevState) => !prevState);
  };

  const handleClose = () => {
    setPetOptions(false);
  };

  return (
    <>
      {petOptions && (

          <div
            className="fixed inset-0 bg-background opacity-70 z-30"
            onClick={handleClose}
          />
      
      )}
      <div className='bg-background text-primary h-16 fixed w-full p-4 bottom-0 flex items-center justify-between transition ease-in-out duration-300 z-50'>
        <Link className={` p-4 border-b-2 border-background ${pathname === '/' ? 'active' : ''}`} href="/"><FaHouse size={25} /></Link>
        <Link className={` p-4 border-b-2 border-background ${pathname === '/chat' ? 'active' : ''}`} href="/chat"><FaComments size={25} /></Link>
        <Link className={` p-4 border-b-2 border-background ${pathname === '/calender' ? 'active' : ''}`} href="/calender"><FaRegCalendarDays size={25} /></Link>
        <button className={` p-4 -translate-y-8 rounded-xl border-solid border-primary border-2 bg-background relative cursor-pointer ${pathname === '' ? 'active' : ''}`} onClick={handlePawToggle}>
          <FaSquarePlus size={25} />
          <OptionsModal show={petOptions} onClose={handleClose} />
        </button>
      </div>
    </>
  )
}

export default Navbar;