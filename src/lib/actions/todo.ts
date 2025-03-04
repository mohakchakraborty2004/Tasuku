// list and tasks 
import prisma from "@/db";
import { getServerSession } from "next-auth";
import authOptions from "./authOptions";


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

export async function fetchActive() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id 

    if (!userId) {
        return {
            msg : "invalid access please login"
        }
    }

    try {
        const response = await prisma.todoList.findFirst({
            where : {
                creatorId : userId
            }, 
            select : {
                id : true,
                Title : true,
                tasks : true
            }
        })

        // return in better format 
        return {
            title : response?.Title,
            id : response?.id,
            tasks : response?.tasks // array of tasks type
        }

        // another approach ===============>>>>>>>

        // const response1 = await prisma.todoList.findFirst({
        //     where : {
        //         creatorId : userId
        //     }, 
        //     select : {
        //         id : true,
        //     }
        // })
        // const listId = response1?.id
        // const tasks = await prisma.tasks.findMany({
        //     where : {
        //         ListId : listId
        //     }
        // })
        // return tasks;

    } catch (error) {
        console.log (error); 
        return {
            msg : "some error occurred", 
            status : 502
        }
    }
}

// fetch all lists 
export async function allLists() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id 

    if (!userId) {
        return {
            msg : "invalid access please login"
        }
    }

    try {
        const Lists = await prisma.todoList.findMany({
            where : {
                creatorId : userId
            }
        })

        // return better format 

        return Lists;
    } catch (error) {
        console.log (error); 
        return {
            msg : "some error occurred", 
            status : 502
        }
    }
}