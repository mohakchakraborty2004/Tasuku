import { CheckSquare, BarChart, Palette, Share2, type LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: "CheckSquare" | "BarChart" | "Palette" | "Share2"
  details: string
}

export default function FeatureCard({ title, description, icon, details }: FeatureCardProps) {
  const IconMap: Record<string, LucideIcon> = {
    CheckSquare,
    BarChart,
    Palette,
    Share2,
  }

  const Icon = IconMap[icon]

  return (
    <div className="bg-black text-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow mb-6">
      <div className="flex items-start gap-6">
        <div className="h-16 w-16 bg-[#ede2bf] rounded-full flex items-center justify-center shrink-0">
          <Icon className="h-8 w-8 text-black" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <p className="text-xl text-gray-200 mb-4">{description}</p>
          <p className="text-gray-300">{details}</p>
        </div>
      </div>
    </div>
  )
}

