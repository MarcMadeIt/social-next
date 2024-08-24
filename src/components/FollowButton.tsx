"use client"

import { switchBlock, switchFollow } from '@/lib/actions'
import React, { useOptimistic, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { FaBan, FaEllipsis } from 'react-icons/fa6'


const FollowButton = ({
    userId,
    isUserBlocked,
    isFollowing,
    isFollowingSent,
}: {
    userId: string,
    isUserBlocked: boolean,
    isFollowing: boolean,
    isFollowingSent: boolean
}) => {

const [moreDropdown, setMoreDropdown] = useState(false);




const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followRequestSent: isFollowingSent
})

const follow = async () => {
    setOptimisticState("follow")
    try {
        await switchFollow(userId)
        setUserState(prev=> ({
            ...prev,
            following:prev.following && false,
            followRequestSent: !prev.following && !prev.followRequestSent ? true : false,
        }))
    }catch(err){}
};

const block = async () => {
    setOptimisticState("block")
    try {
     await switchBlock(userId)
     setUserState(prev=> ({
        ...prev, blocked: !prev.blocked
     }))
    }catch(err) {}
}

const [optimisticState, setOptimisticState] = useOptimistic(
    userState,(state, value: "follow" | "block") => value === "follow" ? {
        ...state, 
        following: state.following && false,
        followRequestSent: 
        !state.following && !state.followRequestSent ? true : false,
    } : {...state, blocked:!state.blocked }
)

  return (
    <div className='flex flex-col justify-center items-center gap-2 relative'>
        <form action={follow}>
            <button className={`min-w-24 max-w-72 ${optimisticState.following ? 'btn-pending' : userState.followRequestSent ? 'btn-pending' : 'btn-cta'}`}>
                {optimisticState.following ? <><FaCheck /> Following </> : userState.followRequestSent ? <><FaCheck /> Amigo request sent</> : "Follow"}
            </button>
        </form>
        <div className="flex flex-col">
            <button 
                className='flex gap-1 items-center cursor-pointer hover:text-extra duration-300 transition-colors' 
                onClick={() => setMoreDropdown(!moreDropdown)}
                >
                <FaEllipsis size={20} className='text-primary'/>
            </button>
            {moreDropdown && 
            <form action={block}>
                 <button className='flex gap-1 items-center cursor-pointer hover:text-extra duration-300 transition-colors'>
                    <FaBan />
                    {optimisticState.blocked ? "Unblock User" : "Block User"}
                </button>
            </form>
            }
        </div>
    </div>
  )
}

export default FollowButton