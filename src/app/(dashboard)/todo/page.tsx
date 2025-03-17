import ListMaker from "@/components/createTodo";
import authOptions from "@/lib/actions/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function profile() {
    const session = await getServerSession(authOptions)
     if (!session?.user) {
        redirect('api/auth/signin');
      }
    return (
        <div className="flex bg-[#ede2bf] w-full">
            <div className="h-screen flex items-center justify-center p-0 w-[100px]">
                <p className="-rotate-90 font-extrabold text-[4rem]">TODO.</p>           
            </div>
            <div>
                <ListMaker></ListMaker>
            </div>
        </div>
    )
}