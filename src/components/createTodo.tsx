"use client";

import { addTask, createList, fetchActive } from "@/lib/actions/todo";
import { use, useEffect, useState } from "react";

export default function ListMaker() {

    const [title, setTitle] = useState<string>("")
    const [fetchT, setFetchT] = useState<string>("")
    const [id, setId] = useState<string>("")
    const [msg, setMsg] = useState<any>();
    const [mssg, setMssg] = useState<any>();
    const [task, setTask] = useState<string>("")
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isLoading1, setLoading1] = useState<boolean>(false)
    const [fetchTask, setFetchTask] = useState<any[]>([])

    useEffect(() => {
        async function fetch() {
            const res = await fetchActive();
            if (res.id) {
                setId(res.id)
            }
            if (res.title) setFetchT(res.title)

            const tasks = res.tasks
            const titles = tasks?.map(t => t.title);

            if (titles) setFetchTask(titles);

        }
        fetch()
    }, [mssg])


    return (
        <div className="p-10">
            <h1 className="text-black font-bold text-3xl">Create List</h1>

            <div className="p-3 mt-2">

                <input type="text" className="bg-black text-white p-3 font-bold rounded-3xl w-[400px] mr-3"
                    aria-placeholder="today's Tasks"
                    placeholder="Set List Title"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }} />
                <button className="bg-green-700 text-white p-3 rounded-2xl font-bold"
                    onClick={async () => {
                        setLoading1(true)
                        const res = await createList(title);
                        if (res.id) {
                            setId(res.id)
                        }
                        setMsg(res.msg);
                        setLoading1(false)
                    }}
                >{isLoading1 ? 'creating list..' : 'Create list'}</button>
                {msg && (
                    <div className="font-medium m-2 flex flex-col">
                        <span className="text-green-900">{msg}</span>
                        <span className="text-green-900 font-bold"> List Id : </span> {id}
                    </div>
                )}

            </div>

            <div className="p-3 mt-2 flex flex-col gap-7">
                <div>

                    <input type="text" className="bg-black text-white p-3 font-bold rounded-3xl w-[400px] mr-3"
                        placeholder="add a task"
                        onChange={(e) => {
                            setTask(e.target.value)
                        }} />
                    <button className="bg-green-700 text-white p-3 rounded-2xl font-bold"
                        onClick={async () => {
                            setLoading(true)
                            const res = await addTask(task, id);
                            setMssg(res.msg);
                            setLoading(false)
                        }}
                        disabled={isLoading}
                    >{isLoading ? 'adding Task' : 'Add Task'}</button>
                    <p className="text-red-800 m-1">*the task you add gets added to the active list/recently created list automatically</p>
                    {msg && (
                        <div className="font-medium m-2">
                            <span className="text-green-900">{mssg}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <h1 className="text-black font-bold text-3xl">Your Active List and Tasks</h1>
                    <div className=" bg-black text-white flex flex-col w-auto gap-3 p-6 rounded-2xl m-3">
                        <h1 className="font-extrabold text-3xl text-yellow-600">{fetchT}</h1>
                        {fetchTask.map((task, index) => (
                            <div>
                                <div key={index} className="flex gap-2 m-1" >
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => { }}
                                    />
                                    <h3>{task}</h3>
                                </div>
                            </div>

                        ))}
                    </div>
                    <button  className="bg-green-700 text-white p-3 rounded-2xl font-bold" >Complete</button>
                </div>


            </div>


        </div>
    )
}