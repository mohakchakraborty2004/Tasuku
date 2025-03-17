"use client"

import { CreatePost } from "@/lib/actions/post";
import { updateList } from "@/lib/actions/todo";
import { useState } from "react";

export default function Complete({id} : {id : string}) {

const [listUpdate, setListupdate] = useState<boolean>(false)

return <div>
    <button  className="bg-green-700 text-white p-3 rounded-lg font-bold w-80" 
// disabled={isId}
onClick={async()=> {
    setListupdate(true)
    const res = await updateList(id);
    console.log(res.msg)
    setListupdate(false)
    const post = await CreatePost(id)
    console.log((post.description));
}}
>{listUpdate ? "wait..." : "Complete"}</button>
</div>
}