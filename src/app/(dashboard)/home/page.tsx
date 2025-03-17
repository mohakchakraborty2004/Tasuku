
import Feed from "@/components/homePage";
import authOptions from "@/lib/actions/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function profile() {
    const session = await getServerSession(authOptions)
     if (!session?.user) {
        redirect('api/auth/signin');
      }
    return (
        <div className="bg-[#ede2bf]">
           <Feed></Feed>
        </div>
    )
}