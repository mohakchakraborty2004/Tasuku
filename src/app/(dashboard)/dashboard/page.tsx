import authOptions from "@/lib/actions/authOptions"
import { getServerSession } from "next-auth"
import Dash from "@/components/dashboard"
import { redirect } from "next/navigation";

export default async function dashboard() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        redirect('api/auth/signin');
    }

    return (
        <div className="flex bg-[#ede2bf] w-full">
        <div className="h-screen flex items-center justify-center p-0 w-[100px]">
            <p className="-rotate-90 font-extrabold text-[4rem]">DASHBOARD.</p>           
        </div>
        <div>
            <Dash></Dash>
        </div>
    </div>
    )
}