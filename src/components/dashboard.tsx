import authOptions from "@/lib/actions/authOptions"
import { getServerSession } from "next-auth"
import prisma from "@/db";
import ListMaker from "./createTodo";

async function getUser(userId : string){
  const res = await prisma.user.findFirst({
    where : {
        id : userId
    }
  })

  return res
}

export default async function Dash() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id
    
    const user = await getUser(userId);

    return <div className="p-20">
        <div className="flex gap-2">
            <div className="h-40 w-40 bg-slate-900 rounded-full row-span-1">
            </div>

            <div className="flex flex-col items-start">
                <h1 className="font-extrabold text-[3.5rem]">
                    @{user?.username}
                </h1>
                <h1 className="font-bold text-[1rem] ml-3">
                    {user?.email}
                </h1>
            
            </div>

            <ListMaker></ListMaker>

        </div>
    </div>
}