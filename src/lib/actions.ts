"use server";

import { z } from "zod";
import prisma from "./client";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export const switchFollow = async (userId: string) => {

    const {userId: currentUserId} = await auth();

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
        console.log(err)
        throw new Error ("Something went wrong")
    }
}

export const switchBlock = async (userId: string) => {
    const {userId: currentUserId} = await auth() 

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
    const { userId: currentUserId } = await auth();

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
    const { userId: currentUserId} = await auth();

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


export const updateProfile = async (
    prevState: { success: boolean; error: boolean },
    payload: {formData?: FormData; cover?: string}
  ) => {
    const {formData, cover} = payload;
    const fields = formData ? Object.fromEntries(formData) : {};

    if (cover) {
        fields.cover = cover;
      }
  
    const filteredFields = Object.fromEntries(
      Object.entries(fields).filter(([_, value]) => value !== "")
    );
  
    console.log("Filtered Fields:", filteredFields);
  
    const ProfileSchema = z.object({
      cover: z.string().optional(),
      firstname: z.string().max(60).optional(),
      surname: z.string().max(60).optional(),
      owner: z.string().max(60).optional(),
      desc: z.string().max(360).optional(),
      city: z.string().max(60).optional(),
      country: z.string().max(60).optional(),
      race: z.string().max(60).optional(),
      color: z.string().max(60).optional(),
    });
  
    // Validate `filteredFields` with Zod
    const validatedFields = ProfileSchema.safeParse(filteredFields);
  
    if (!validatedFields.success) {
      console.log("Validation Errors:", validatedFields.error.flatten().fieldErrors);
      return { success: false, error: true };
    }
  
    // Assume userId is retrieved from an auth mechanism
    const { userId } = await auth();
  
    if (!userId) {
      console.log("User not authenticated");
      return { success: false, error: true };
    }
  
    try {
      await prisma.user.update({
        where: { id: userId },
        data: validatedFields.data,
      });
      console.log("Profile updated successfully");
      return { success: true, error: false };
    } catch (err) {
      console.error("Update Error:", err);
      return { success: false, error: true };
    }
  };

  export const switchLike = async (postId: number) => {
    const { userId } = await auth();
  
    // Return a specific response if the user is not authenticated
    if (!userId) {
      return { success: false, message: "User is not authenticated" };
    }
  
    try {
      const existingLike = await prisma.like.findFirst({
        where: {
          postId,
          userId,
        },
      });
  
      if (existingLike) {
        await prisma.like.delete({
          where: {
            id: existingLike.id,
          },
        });
      } else {
        await prisma.like.create({
          data: {
            postId,
            userId,
          },
        });
      }
  
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, message: "Something went wrong" };
    }
  };
  

export const addComment = async (postId:number, desc:string) => {
    const {userId} = await auth()

    if(!userId) throw new Error("User is not authenticated!")

        try {
            const createdComment = await prisma.comment.create({
                data:{
                    desc,
                    userId,
                    postId,
                },
                include: {
                    user: true
                }
            })
        return createdComment;
        }catch(err){
            console.log (err) 
            throw new Error("Something went wrong")
        }
}


export const addPost =  async (formData: FormData, img:string) => {
    const desc = formData.get("desc") as string;
    const Desc = z.string().min(1).max(225);

    const validatedDesc = Desc.safeParse(desc)

    if (!validatedDesc.success) {
        
        return
    }

    const {userId} = await auth();

    if(!userId) throw new Error("User is not authenticated!")

    try {
        await prisma.post.create({
            data:{
                desc:validatedDesc.data,
                userId,
                img,
            }
        });

        revalidatePath("/");
    }catch(err){
        console.log (err) 
        throw new Error("Something went wrong")
    }

}


export const deletePost = async (postId: string) => {  
    const { userId } = await auth();

    if (!userId) throw new Error("User is not authenticated!");

    try {

        const postIdAsNumber = Number(postId);

        if (isNaN(postIdAsNumber)) {
            throw new Error("Invalid post ID");
        }

        const post = await prisma.post.findUnique({
            where: { id: postIdAsNumber },  
        });

        if (!post) {
            throw new Error("Post not found");
        }

        if (post.userId !== userId) {
            throw new Error("User is not authorized to delete this post");
        }

        await prisma.post.delete({
            where: {
                id: postIdAsNumber,
            },
        });

        revalidatePath("/");
    } catch (err) {
        console.error(err);
        throw new Error("Something went wrong while deleting the post");
    }
};

export const addStory =  async (img:string) => {

    const {userId} = await auth();

    if(!userId) throw new Error("User is not authenticated!")

    try {

        const existingStory = await prisma.story.findFirst({
            where: {
                userId
            }
        })

        if (existingStory) {
            await prisma.story.delete({
                where: {
                    id: existingStory.id
                }
            })
        }
        const createdStory = await prisma.story.create({
            data:{
                userId,
                img,
                expiresAt: new Date(Date.now()+24*60*60*1000),
            },
            include: {
                user: true
            }
        });

        return createdStory;
    }catch(err){
        console.log (err) 
        throw new Error("Something went wrong")
    }

}