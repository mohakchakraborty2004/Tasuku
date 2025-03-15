import LandingPage from "@/components/landing";
import authOptions from "@/lib/actions/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);



  return <div>
    <LandingPage></LandingPage>
  </div>
}
