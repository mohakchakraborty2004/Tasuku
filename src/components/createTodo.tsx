"use client";

import { addTask, createList, fetchActive } from "@/lib/actions/todo";
import { use, useEffect, useState } from "react";

export default function ListMaker() {

    const [title, setTitle] = useState<string>("")
    const [id, setId] = useState<string>("")
    const [msg, setMsg] = useState<any>();
    const [mssg, setMssg] = useState<any>();
    const [task, setTask] = useState<string>("")
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isLoading1, setLoading1] = useState<boolean>(false)
    const [fetchTask, setFetchTask] = useState<any[]>([])

    useEffect(()=> {
       async function fetch() {
        const res = await fetchActive();
        if(res.id){
            setId(res.id)
        }
        const tasks = res.tasks
        const titles = tasks?.map( t => t.title);
        
        if(titles) setFetchTask(titles);
        
       }
       fetch()
    }, [mssg])


    return (
        <div>
            <input type="text" className="bg-black text-white" onChange={(e) => {
                setTitle(e.target.value);
            }}/>
            <button className="bg-black text-white" 
            onClick={async ()=> {
                setLoading1(true)
                const res = await createList(title);
                if(res.id) {
                    setId(res.id)
                }
                setLoading(false)
                setMsg(res.msg);
            }}
            >{isLoading1 ? 'creating list..' : 'Create list'}</button>
            {msg && (
                <div>
                    {msg}
                    {id}
                </div>
            )}

            <input type="text" className="bg-black mt-2 text-white" onChange={(e) => {
                setTask(e.target.value)
            }}  />
            <button className="bg-black text-white" 
            onClick={async ()=> {
                setLoading(true)
                const res = await addTask(task, id);
                setMssg(res.msg);
                setLoading(false)
            }}
            disabled = {isLoading}
            >{isLoading ? 'adding Task' : 'Add Task'}</button>
             {msg && (
                <div>
                    {mssg}
                </div>
            )}


            {fetchTask}
        </div>
    )
}