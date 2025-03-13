"use client";

import { createList } from "@/lib/actions/todo";
import { use, useState } from "react";

export default function ListMaker() {

    const [title, setTitle] = useState<string>("")
    
    const [msg, setMsg] = useState<any>();

    return (
        <div>
            <input type="text" className="bg-black text-white" onChange={(e) => {
                setTitle(e.target.value);
            }}/>
            <button className="bg-black text-white" 
            onClick={async ()=> {
                const res = await createList(title);
                setMsg(res.msg);
            }}
            >create list</button>
            {msg && (
                <div>
                    {msg}
                </div>
            )}
        </div>
    )
}