"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, ListChecks } from "lucide-react"

type CompletionData = {
  EndTime: Date | null
  completedTasks: number
  TotalTasks: number
}

interface TaskCompletionSummaryProps {
  data: CompletionData[] // Accepting an array of CompletionData objects
}

export default function TaskCompletionSummary({ data }: TaskCompletionSummaryProps) {
  const [period, setPeriod] = useState("week")

 
  const totalTasks = data.reduce((sum, entry) => sum + (entry.TotalTasks || 0), 0)
  const totalCompleted = data.reduce((sum, entry) => sum + (entry.completedTasks || 0), 0)

 
  const completionRate = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0

  
  const mostProductiveEntry = data.reduce((best, entry) =>
    (entry.completedTasks || 0) > (best?.completedTasks || 0) ? entry : best, data[0])

  const mostProductiveDay = mostProductiveEntry?.EndTime
    ? new Date(mostProductiveEntry.EndTime).toLocaleDateString("en-US", { weekday: "long" })
    : "N/A"

  return (
    <Card className="bg-black text-white">
      <CardHeader>
        <CardTitle>Task Completion Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="week" className="space-y-4">
          <TabsList>
            <TabsTrigger className="bg-black text-white m-1" value="week">This Week</TabsTrigger>
            <TabsTrigger className="bg-black text-white m-1" value="month">This Month</TabsTrigger>
            <TabsTrigger className="bg-black text-white m-1" value="year">This Year</TabsTrigger>
          </TabsList>

          {["week", "month", "year"].map((timeframe) => (
            <TabsContent key={timeframe} value={timeframe} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <StatsCard
                  icon={<CheckCircle className="h-4 w-4 text-green-500" />}
                  title="Completion Rate"
                  value={`${completionRate}%`}
                  description={`Tasks completed this ${timeframe}`}
                />
                <StatsCard
                  icon={<ListChecks className="h-4 w-4 text-blue-500" />}
                  title="Most Productive Day"
                  value={mostProductiveDay}
                  description={`${mostProductiveEntry?.completedTasks || 0} tasks completed`}
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface StatsCardProps {
  icon: React.ReactNode
  title: string
  value: string
  description: string
}

function StatsCard({ icon, title, value, description }: StatsCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
