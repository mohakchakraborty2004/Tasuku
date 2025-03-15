import { CheckCircle } from "lucide-react"

export default function TaskukuLogo() {
  return (
    <div className="relative h-8 w-8 flex items-center justify-center">
      <div className="absolute inset-0 bg-black rounded-md rotate-45"></div>
      <CheckCircle className="relative z-10 text-[#ede2bf] h-5 w-5" />
    </div>
  )
}

