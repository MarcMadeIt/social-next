"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "./client";

export const switchFollow = async (userId: string) => {

    const {userId: currentUserId} = auth();

    if (!currentUserId) {
        throw new Error("user is not autheticated")
    }

    try {
        const existingFollow = await prisma.follower.findFirst ({
            where: {
                followerId:currentUserId,
                followingId:userId,
            },
        })

        if (existingFollow) {
            await prisma.follower.delete({
                where: {
                    id: existingFollow.id
                }
            })
        }else {
            const existingFollowRequest = await prisma.followerRequest.findFirst({
                where: {
                    senderId:currentUserId,
                    receiverId: userId,
                }
            })

            if(existingFollowRequest) {
                await prisma.followerRequest.delete({
                    where: {
                        id: existingFollowRequest.id
                    }
                })
            }else {
                await prisma.followerRequest.create ({
                    data: {
                        senderId: currentUserId,
                        receiverId: userId
                    }
                })
            }
        }

    }catch (err) {
        console.log()
        throw new Error ("Something went wrong")
    }
}

export const switchBlock = async (userId: string) => {
    const {userId: currentUserId} = auth() 

    if(!currentUserId){
        throw new Error("User is not authenticated!")
    }
    try {
        const existingBlock = await prisma.block.findFirst ({
            where: {
                blockerId: currentUserId,
                blockedId: userId,
            }
        });

        if(existingBlock){
            await prisma.block.delete({
                where: {
                    id:existingBlock.id
                }
            })
        }else
        await prisma.block.create ({
            data:{
                blockerId: currentUserId,
                blockedId: userId,
            }
        })
    }catch(err) {
        console.log(err)
        throw new Error("Something went wrong")
    }
}

export const acceptFollowRequest = async (userId: string) => {
    const { userId: currentUserId } = auth();

    if (!currentUserId) {
        throw new Error("User is not Authenticated");
    }

    try {
        const existingFollowRequest = await prisma.followerRequest.findFirst({
            where: {
                senderId: userId,
                receiverId: currentUserId,
            },
        });

        if (existingFollowRequest) {
 
            await prisma.followerRequest.delete({
                where: {
                    id: existingFollowRequest.id,
                },
            });

            await prisma.follower.create({
                data: {
                    followerId: userId,
                    followingId: currentUserId,
                },
            });

       
            await prisma.follower.create({
                data: {
                    followerId: currentUserId,
                    followingId: userId,
                },
            });
        } else {
            throw new Error("Follow request does not exist");
        }
    } catch (err) {
        console.log(err);
        throw new Error("Something went wrong");
    }
};

export const declineFollowRequest = async (userId:string)=> {
    const { userId: currentUserId} = auth();

    if (!currentUserId) {
        throw new Error ("User is not Authenticated")
    }

    try {

        
        const existingFollowRequest = await prisma.followerRequest.findFirst ({
            where: {
                senderId: userId,
                receiverId: currentUserId,
            },
        })
        
        if (existingFollowRequest) {
            await prisma.followerRequest.delete ({
                where: {                    
                    id: existingFollowRequest.id
                },
            });
        }
        
        
    }catch(err) {
        console.log (err)
        throw new Error("something went wrong")
    }
}