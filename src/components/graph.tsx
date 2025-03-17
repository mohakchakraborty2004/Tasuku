import ContributionGraph from "@/components/contribution-graph"

export default function Graph() {
  return (
    <div className="container py-5">
       <div className="py-4">
        <h2 className="text-xl font-bold mb-4">Contribution <span className="text-green-800">Graph</span></h2>
        <ContributionGraph />
      </div>
    </div>
  )
}

