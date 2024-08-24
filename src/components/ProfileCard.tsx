import prisma from '@/lib/client'
import { auth} from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'

const ProfileCard = async () => {

    const { userId } = auth();

    if (!userId) return null;

    const user = await prisma.user.findFirst ({
        where: {
            id: userId
        }, 
        include: {
            _count: {
                select: {
                    Followers: true
                }
            }
        }
    })

    console.log(user)

    if (!user) return null;


  return (
    <div className='p-2 flex flex-col gap-5 bg-foreground rounded-xl shadow-xl text13 h-60'>
        <div className="relative h-[60%]">
            <Image src={user.cover || "/pawcover.png"} alt='' fill className='object-cover rounded-lg' />
            <Image src={user.avatar || "/noavatar.png"} alt='' width={80} height={80} className="object-cover rounded-[25%] absolute left-0 right-0 m-auto -bottom-10 ring-8 ring-foreground z-10"/>
        </div>
            <div className='h-[40%] flex items-center justify-center'>
            <Link href={`/profile/${user.username}`} className='btn-cta-light'>My Profile</Link>
        
        </div>
    </div>
  )
}

export default ProfileCard