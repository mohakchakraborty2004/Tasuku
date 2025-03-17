"use server"

// route related posts 
import prisma from "@/db";
import { getServerSession } from "next-auth";
import authOptions from "./authOptions";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const AGENT_URL = process.env.AGENT_URL;



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
                tasks : {
                    where : {
                        completed : true
                    },
                    select : {
                        title : true,
                    }
                } ,
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

        

        const username = res?.creator.username;
        const tasks = res?.tasks 

        const data = {
            tasks : tasks.map(t => t.title)
        }

        // check for if a post already exists
        const findPost = await prisma.posts.findUnique({
            where : {
                TodoId : listId
            }
        })

        if (findPost) {
            if (!description) {
                // replace this with prod url
             const res = await axios.post(`${AGENT_URL}/gen-tweet`, data) 
             console.log("response :", res.data)
             description = res.data.tweet; 
            }

           const res = await prisma.posts.update({
                where : {
                    TodoId : listId
                } ,
                data : {
                    description : description ? description : "tweet gen down"
                }
            })

            return {
                 msg : "post updated",
                 description,
                 post : res.id
            }
            
        }
        

        if (!description) {
         const res = await axios.post(`${AGENT_URL}/gen-tweet`, data) 
         console.log("response :", res.data)
         description = res.data.tweet; 
        }
 
        if(!res?.completed){
            return {
                msg : "list incomplete, complete before posting"
            }
        }

        const post = await prisma.posts.create({
            data : {
                description : description ? description : "tweet gen down",
                postedAt : new Date(),
                posterId : userId,
                TodoId : listId
            }
        })
        
        return {
            msg : "post created",
            status : 200, 
            id : post.id,
            username,
            description
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

        
        const postings = posts.map(p => {
        const id = p.id
        const desc =  p.description

        return {
            id ,
            desc
        }
        })

        return postings;
        
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

export async function Posts() {
    try {
        const post = await prisma.posts.findMany(
            {
                include : {
                    User : {
                        select : {
                            username : true
                        }
                    },
                    Todo : {
                        select : {
                            Title : true
                        }
                    }
                }
            }
        );

        return post
    } catch (error) {
        
    }
}