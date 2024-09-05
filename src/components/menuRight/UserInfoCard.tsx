
import Link from 'next/link'
import { FaAddressCard, FaAdjust } from 'react-icons/fa'
import { FaFacebook, FaInstagram, FaLocationDot, FaPersonCircleCheck } from 'react-icons/fa6'
import UpdateUser from './UpdateUser'
import { auth } from '@clerk/nextjs/server'
import { User } from '../../../prisma/generated/client'

const UserInfoCard = ({user}:{user: User}) => {
    const {userId: currentUserId} = auth();


    const createdAtDate = new Date(user.createdAt)

    const formattedDate = createdAtDate.toLocaleDateString("en-US", {
        year:'numeric',
        month:'long',
        day:'numeric'
    })


  return (
    <div className='p-3 flex flex-col gap-6 bg-foreground rounded-xl shadow-xl text12'>
            
        <div className='flex justify-between text-primary text12'>
            <span className='text-secondary text-sm'>User information</span>
            {currentUserId === user.id ? (<UpdateUser user={user} />) : (<Link href="/"> <span className='font-medium text-secondary'>See all</span></Link>)}
        </div>
            {/* Names & Usernames */}
        <div className='flex flex-col gap-5'>
            <div className='flex gap-3 items-center'>
                <p className='text12 text-extra py-1 px-2 bg-user rounded-md font-semibold'><span className='text-lg leading-3 cursor-pointer'>@</span>{user.username}</p>

                <div className='flex items-center gap-2 text-primary'>
            <FaPersonCircleCheck className='text-primary' size={18} />
                <span className='font-semibold'> {user.owner}</span>
            </div>
            </div>
        
            {user.desc && 
            <p className='text12 text-text'>{user.desc}</p>
            }
            <div className='flex gap-2 text-primary'>
                <FaLocationDot size={18} />
                <p>Living in <span className='font-semibold'>{user.city}, {user.country}</span></p>
            </div>


            {user.race && <div className='flex gap-2 text-primary'>
                <FaAddressCard size={18} />
                <p>My parents is <span className='font-semibold'>{user.race}</span></p>
            </div>}
            {user.color && <div className='flex gap-2 text-primary'>
                <FaAdjust size={18} />
                <p>The style is <span className='font-semibold'>{user.color}</span></p>
            </div>
            }   
        </div>
        <div className='flex gap-5 text-sm text-secondary'>
            {user.instagram && <Link href="/" className='cursor-pointer flex items-center gap-1'>
                <FaInstagram />
                <span>{user.instagram} </span>
            </Link>
}
            {user.facebook && <Link href="/" className='cursor-pointer flex items-center gap-1'>
                <FaFacebook />
                <span>{user.facebook} </span>
            </Link>
        }
        </div>  
        <div className='flex w-100 justify-end'>
            <span className='text-secondary'>
                Joned at <span className='font-semibold'>{formattedDate}</span>
            </span>
        </div>
    </div>
  )
}

export default UserInfoCard