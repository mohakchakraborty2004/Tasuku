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
  data: CompletionData // Expecting a single object now
}

export default function TaskCompletionSummary({ data }: TaskCompletionSummaryProps) {
  const [period, setPeriod] = useState("week")

  // Calculate summary statistics
  const totalTasks = data.TotalTasks || 0
  const totalCompleted = data.completedTasks || 0
  const completionRate = data.TotalTasks > 0 ? Math.round((data.completedTasks / data.TotalTasks) * 100) : 0;
  const mostProductiveDay = data.EndTime ? new Date(data.EndTime).toLocaleDateString("en-US") : "N/A"; 


  return (
    <Card className="bg-black text-white">
      <CardHeader>
        <CardTitle>Task Completion Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="week" className="space-y-4">
          <TabsList className="">
            <TabsTrigger className="bg-black text-white" value="week">This Week</TabsTrigger>
            <TabsTrigger className="bg-black text-white" value="month">This Month</TabsTrigger>
            <TabsTrigger className="bg-black text-white" value="year">This Year</TabsTrigger>
          </TabsList>

          <TabsContent value="week" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <StatsCard
                icon={<CheckCircle className="h-4 w-4 text-green-500" />}
                title="Completion Rate"
                value={`${completionRate}%`}
                description="Tasks completed this week"
              />
              <StatsCard
                icon={<ListChecks className="h-4 w-4 text-blue-500" />}
                title="Most Productive Day"
                value={
                  data.EndTime
                    ? new Date(data.EndTime).toLocaleDateString("en-US", { weekday: "long" })
                    : "N/A"
                }
                description={`${data.completedTasks} tasks completed`}
              />
            </div>
          </TabsContent>

          <TabsContent value="month" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <StatsCard
                icon={<CheckCircle className="h-4 w-4 text-green-500" />}
                title="Completion Rate"
                value={`${completionRate}%`}
                description="Tasks completed this month"
              />
              <StatsCard
                icon={<ListChecks className="h-4 w-4 text-blue-500" />}
                title="Most Productive Day"
                value={
                  data.EndTime
                    ? new Date(data.EndTime).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"
                }
                description={`${data.completedTasks} tasks completed`}
              />
            </div>
          </TabsContent>

          <TabsContent value="year" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <StatsCard
                icon={<CheckCircle className="h-4 w-4 text-green-500" />}
                title="Completion Rate"
                value={`${completionRate}%`}
                description="Tasks completed this year"
              />
              <StatsCard
                icon={<ListChecks className="h-4 w-4 text-blue-500" />}
                title="Most Productive Day"
                value={
                  data.EndTime
                    ? new Date(data.EndTime).toLocaleDateString("en-US", { month: "long", day: "numeric" })
                    : "N/A"
                }
                description={`${data.completedTasks} tasks completed`}
              />
            </div>
          </TabsContent>
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
