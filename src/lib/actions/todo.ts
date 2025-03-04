// list and tasks 
import prisma from "@/db";
import { getServerSession } from "next-auth";
import authOptions from "./authOptions";
import { Staatliches } from "next/font/google";


// create a list 
export async function createList(title : string) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id 

    if (!userId) {
        return {
            msg : "invalid access please login"
        }
    }

    try {
        const response = await prisma.todoList.create({
            data :{
                Title : title,
                EndTime : "null", // find a way to improve 
                creatorId : userId
            }
        })

        const id = response.id;

        return {
            msg : "list created , add tasks",
            id
        }

    } catch (error) {
        console.log(error);
        return {
          msg : "some error occured",
          status : 502 
        }
    }
}

export async function addTask(title : string, listId : string ,description? : string) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id 

    if (!userId) {
        return {
            msg : "invalid access please login"
        }
    }

    try {
        const response =  await prisma.tasks.create({
            data : {
                title : title,
                description : description || "",
                endTime : "null",
                ListId : listId
            }
        })

        return {
            msg : "task created" ,
            taskId : response.id
        }
    } catch (error) {
        console.log(error)
        return {
            msg : "some error occured", 
            Status : 502
        }
    }
}

// fetch all tasks of active lists




// fetch all lists 