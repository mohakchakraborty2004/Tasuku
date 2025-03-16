"use client"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { Github, Twitter } from "lucide-react"
// import { button } from "@/components/ui/button"
import TaskukuLogo from "@/components/tasuku-logo"
import FeatureCard from "@/components/feature-card"
import { redirect } from "next/navigation"


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#ede2bf] justify-center items-center">
  
      <header className="w-full pt-10 px-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TaskukuLogo />
          <span className="text-xl font-extrabold">Tasuku</span>
        </div>
        <button className="bg-white hover:bg-gray-100 p-3 rounded-2xl font-extrabold"
        onClick={()=> {
          signIn(undefined, { callbackUrl: '/dashboard' })
        }}
        >
          Sign In
        </button>
      </header>

 
      <section className="container px-4 md:py-20 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Track Your Tasks, Build Your Habits</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-10 font-semibold">
          Tasuku helps you create daily todo lists and visualize your progress over time, encouraging consistency and
          accountability.
        </p>
        <div className="flex gap-4">
          <button className="bg-black text-white hover:bg-gray-800 p-3 rounded-2xl font-bold">Get Started</button>
          <button  className="bg-white hover:bg-gray-100 p-3 rounded-2xl" 
          onClick={()=> {
            redirect("#feature")
          }}
          >
            Learn More
          </button>
        </div>
      </section>


      
      <section>
        <img src="/doodle.png" alt="" />
      </section>


      <section id="feature" className="container px-4 py-16 md:py-24 flex flex-col justify-center">
        <h2 className="text-3xl md:text-[4rem] font-bold text-center mb-12">Features</h2>
        <div className="space-y-8">
          <FeatureCard
            title="Daily Todo Lists"
            description="Create and manage your daily tasks with ease"
            icon="CheckSquare"
            details="Our intuitive task management system allows you to organize your day efficiently. Create recurring tasks, set priorities, add due dates, and categorize your todos. The clean interface makes it simple to focus on what matters most, helping you stay organized and productive throughout your day."
          />

      <section className="flex justify-center items-center">
        <img src="/doodle2.png" alt="" height={400} width={400}/>
      </section>

          <FeatureCard
            title="Visual Progress Tracking"
            description="Monitor your consistency with GitHub-style contribution graphs"
            icon="BarChart"
            details="Visualize your productivity patterns over time with our contribution graph system. Similar to GitHub's activity tracker, you'll see your daily task completion represented in an easy-to-understand heatmap. This visual feedback helps you identify trends, maintain streaks, and build consistent habits that lead to long-term success."
          />

      <section className="flex justify-center items-center">
        <img src="/doodle3.png" alt="" height={400} width={400}/>
      </section>

  
          <FeatureCard
            title="Social Integration"
            description="Share your achievements and connect with friends"
            icon="Share2"
            details="Stay motivated by connecting with friends and sharing your accomplishments. Our social features let you celebrate milestones, participate in challenges, and even compete on leaderboards. The accountability of sharing your progress with others has been proven to significantly increase the likelihood of forming lasting habits."
          />
        </div>
      </section>

      <section>
        <img src="/doodle1.png" alt="" />
      </section>

      <section className="container px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to boost your productivity?</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 font-bold text-green-900">
          Join thousands of users who have improved their daily habits with Tasuku.
        </p>
        <button className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg rounded-2xl">Start For Free</button>
      </section>

      <footer className="mt-auto w-full bg-[#e6d9b0] py-8 flex flex-col items-center justify-center">
        <div className="container px-4">
          <div className="text-center mb-6">
            <h2 className="text-[min(8vw,5rem)] font-extrabold opacity-20">TASUKU.</h2>
          </div>
          <div className="flex justify-center gap-6">
            <Link href="https://github.com/mohakchakraborty2004/tasuku" className="hover:opacity-80">
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://x.com/I_Mohak19" className="hover:opacity-80">
              <Twitter size={24} />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
          <div className="text-center mt-6 text-sm">
            <p>© {new Date().getFullYear()} Tasuku. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

