// route related posts 
import prisma from "@/db";
import { getServerSession } from "next-auth";
import authOptions from "./authOptions";


export async function CreatePost( listId: string, description? : string) {
    const session  = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return {
            msg : "unauthorized access",
            status : 400
        }
    }

    try {
        const res = await prisma.todoList.findUnique({
            where : {
                id : listId
            }, 
            include : {
                tasks : true ,
                creator : {
                    select : {
                        username : true
                    }
                }
            }
        })

        if (!res) {
            return {
                msg : "no list found"
            }
        }

        const tasks = res?.tasks;
        const username = res?.creator.username;
        const title = res?.Title;

        

        if (!description) {
            description = `Completed ${tasks?.length} of my list ${title}. These included ${tasks?.map((t)=> {
                t.description
            })}`
        }
 
        if(!res?.completed){
            return {
                msg : "list incomplete, complete before posting"
            }
        }

        const post = await prisma.posts.create({
            data : {
                description : description,
                postedAt : new Date(),
                posterId : userId,
                TodoId : listId
            }
        })
        
        return {
            msg : "post created",
            status : 200, 
            id : post.id,
            username
        }
    } catch (error) {
        console.log(error); 
        return {
            msg : "some error occured", 
            status : 502
        }
    }
}


export async function getAllPosts() {
    const session  = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return {
            msg : "unauthorized access",
            status : 400
        }
    }

    try {
        const posts = await prisma.posts.findMany({
            where : {
                posterId : userId
            }
        })

        // can return better types
        return posts
        
    } catch (error) {
        console.log(error); 
        return {
            msg : "some error occured", 
            status : 502
        }
    }
}

export async function deletePost(postId : string) {
    const session  = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return {
            msg : "unauthorized access",
            status : 400
        }
    }

    try {
        const res = await prisma.posts.delete({
           where : {
            id : postId
           }
        })

        // can return better types
        return {
            msg : "deleted post",
            res
        }
        
    } catch (error) {
        console.log(error); 
        return {
            msg : "some error occured", 
            status : 502
        }
    }
}