"use client"
import { FaCircleCheck, FaRegCircleXmark } from 'react-icons/fa6'
import React, { useOptimistic, useState } from 'react'
import Image from 'next/image'

import { acceptFollowRequest, declineFollowRequest } from '@/lib/actions'
import { FollowerRequest, User } from '../../../prisma/generated/client'

type RequestsWithUser = FollowerRequest & {
    sender: User
}

const PawPalsRequestList = ({ requests }: { requests: RequestsWithUser[] }) => {
  console.log("Received Requests in Component:", requests);

  const [requestState, setRequestState] = useState(requests);

  const [optimisticRequest, removeOptimisticRequest] = useOptimistic(requestState, (state, value: number) =>
      state.filter((req) => req.id !== value)
  );

    const accept = async (requestId: number, userId: string) => {
        removeOptimisticRequest(requestId);
        try {
            await acceptFollowRequest(userId)
            setRequestState(prev => prev.filter(req => req.id !== requestId))
        } catch(err){
            throw new Error ("Something is wrong")
        }
    }

    const decline = async (requestId: number, userId: string) => {
        removeOptimisticRequest(requestId);
        try {
            await declineFollowRequest(userId)
            setRequestState(prev => prev.filter(req => req.id !== requestId))
        } catch(err){
            throw new Error ("Something is wrong")
        }
    }

    return (
        <div>
            {optimisticRequest.map(request => (
                <div className='flex flex-col gap-3 text-primary' key={request.id}>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-2 items-center'>
                            <div className='w-5 h-5 relative'>
                                <Image src={request.sender.avatar || "/noavatar.png"} alt='' fill className=' rounded-md object-cover' />
                            </div>
                            <p className='text13 text-extra py-1 px-2 bg-user rounded-md font-semibold'><span className='text-lg leading-3'>@</span>{request.sender.username}</p>
                        </div>
                        <div className='flex gap-2'>
                            <form action={() => accept(request.id, request.sender.id)}>
                                <button>
                                    <FaCircleCheck className='cursor-pointer text-primary' size={18} />
                                </button>
                            </form>
                            <form action={() => decline(request.id, request.sender.id)}>
                                <button>
                                    <FaRegCircleXmark className='cursor-pointer text-secondary' size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PawPalsRequestList
