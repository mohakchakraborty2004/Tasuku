import { deleteList } from "@/lib/actions/todo"

export default function Delete({id} : {id : string} ) {

    return <div>
         <button className="bg-red-700 text-white p-3 rounded-lg font-bold w-80"
                    // disabled={isId}
                    onChange={async()=> {
                        const res = await deleteList(id);
                        console.log(res.msg)
                    }}
                     >delete</button>
    </div>
}