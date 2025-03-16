import ContributionGraph from "@/components/contribution-graph"

export default function Graph() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Task Completion Dashboard</h1>

      <div className="py-4">
        <h2 className="text-xl font-semibold mb-4">Your Contribution Graph</h2>
        <ContributionGraph />
      </div>
    </div>
  )
}

