import ListMaker from "@/components/createTodo";

export default function profile() {
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