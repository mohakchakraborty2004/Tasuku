"use client"
import { useEffect, useState } from "react"
import prisma from "@/db";
import { Posts } from "@/lib/actions/post";

 

export default function Feed() {

    const [posts, setPosts] = useState<any[]>([]);

    useEffect(()=> {
        async function fetch() {
            const post = await Posts()

            if(post) {
                setPosts(post);
            }
        }

        fetch();
    }, [])


    return (
        <div className="flex bg-[#ede2bf]">
            <div className="h-screen flex items-center justify-center p-0 w-[100px]">
                <p className="-rotate-90 font-extrabold text-[4rem]">HOME.</p>
            </div>

            <div className="flex flex-col mt-5">
                {posts.map((p) =>(
                     <div className="ml-[5rem] p-5">
                     <div className="flex flex-col p-5 border border-white rounded-3xl bg-black text-white">
                         <div className="flex gap-2 mb-2">
                             <div className="bg-white h-5 w-5 rounded-full"></div>
                             <h1 className="font-bold">{p.User.username}</h1>
                         </div>
                         <h1 className="font-semibold m-1">{p.Todo.Title}</h1>
                         <p className="m-1">{p.description}</p>
                     </div>
                 </div>
                ) )}
            </div>

           
        </div>
    )
}