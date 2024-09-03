import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'
import PawPalsRequestList from './PawPalsRequestList'

const PawPalsRequest = async () => {
  const { userId } = auth();

  console.log("Current User ID:", userId);

  if (!userId) return null;

  const requests = await prisma.followerRequest.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      sender: true,
    },
  });
  
  console.log("Requests:", requests);
  

  if (requests.length === 0) return null; 

  return (
    <div className='p-3 flex flex-col gap-5 bg-foreground rounded-xl shadow-xl text12'>
      {/* Header */}
      <div className='flex justify-between text-primary'>
        <span>PawsPals Requests</span>
        <Link href="/"> <span className='font-medium text-extra'>See all</span></Link>
      </div>
      {/* Requests */}
    <PawPalsRequestList requests={requests} />

    </div>
  )
}

export default PawPalsRequest