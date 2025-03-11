import authOptions from "@/lib/actions/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function profile() {
    const session = await getServerSession(authOptions)
     if (!session?.user) {
        redirect('api/auth/signin');
      }
    return (
        <div className="flex bg-[#ede2bf]">
            <div className="h-screen flex items-center justify-center p-0 w-[100px]">
                <p className="-rotate-90 font-extrabold text-[4rem]">HOME.</p>
            </div>

            <div className="flex flex-col mt-5">
            <div className="ml-[5rem] p-5">
                <div className="flex flex-col p-5 border border-white rounded-3xl bg-black text-white">
                    <div className="flex gap-2 mb-2">
                        <div>pfp</div>
                        <h1 className="font-bold">username</h1>
                    </div>
                    <h1 className="font-semibold">Lorem ipsum dolor sit amet.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est omnis quae sunt molestiae delectus, deserunt porro temporibus dicta soluta ducimus.</p>
                </div>
            </div>

            <div className="ml-[5rem] p-5 ">
                <div className="flex flex-col p-5 border border-white rounded-3xl bg-black text-white">
                    <div className="flex gap-2 mb-2">
                        <div>pfp</div>
                        <h1 className="font-bold">username</h1>
                    </div>
                    <h1 className="font-semibold">Lorem ipsum dolor sit amet.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est omnis quae sunt molestiae delectus, deserunt porro temporibus dicta soluta ducimus.</p>
                </div>
            </div>

            <div className="ml-[5rem] p-5">
                <div className="flex flex-col p-5 border border-white rounded-3xl bg-black text-white">
                    <div className="flex gap-2 mb-2">
                        <div>pfp</div>
                        <h1 className="font-bold">username</h1>
                    </div>
                    <h1 className="font-semibold">Lorem ipsum dolor sit amet.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est omnis quae sunt molestiae delectus, deserunt porro temporibus dicta soluta ducimus.</p>
                </div>
            </div>
            </div>

           
        </div>
    )
}