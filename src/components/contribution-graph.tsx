"use client"

import { useState, useEffect } from "react"
import { format, startOfYear, endOfYear, eachDayOfInterval, isSameDay, parseISO } from "date-fns"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { completedLists } from "@/lib/actions/todo"
import TaskCompletionSummary from "./task-completion-summary"

export default function ContributionGraph() {
  const [completedData, setCompletedData] = useState<{
    EndTime: Date | null;
    completedTasks: number;
    TotalTasks: number;
}>({
    EndTime: null, 
    completedTasks: 0,
    TotalTasks: 0
});
  const [loading, setLoading] = useState(true)


  const currentYear = new Date().getFullYear()
  const startDate = startOfYear(new Date(currentYear, 0, 1))
  const endDate = endOfYear(new Date(currentYear, 11, 31)) // Fixed end of year calculation
  const days = eachDayOfInterval({ start: startDate, end: endDate })

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await completedLists()
        if (result.EndTime && result.msg === "fetched") {
          setCompletedData({
            EndTime: result.EndTime || null,
            completedTasks: result.completedTasks || 0,
            TotalTasks: result.TotalTasks || 0
          })
        }
      } catch (error) {
        console.error("Error fetching completed lists:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const isCompletedDay = (day: Date) => {
    if (!completedData.EndTime) return false;
  
    const completedDate = new Date(completedData.EndTime);
    console.log(isSameDay(day, completedDate)) 
    return isSameDay(day, completedDate); // Compare correctly
  };
  
  
  const getColorIntensity = (day: Date) => {
    if (isCompletedDay(day)) {
      const ratio = completedData.completedTasks / (completedData.TotalTasks || 1)

      if (ratio === 0) return "bg-gray-100 dark:bg-gray-800"
      if (ratio <= 0.25) return "bg-green-100 dark:bg-green-900"
      if (ratio <= 0.5) return "bg-green-300 dark:bg-green-700"
      if (ratio <= 0.75) return "bg-green-500 dark:bg-green-500"
      return "bg-green-700 dark:bg-green-300"
    }
    return "bg-gray-100 dark:bg-gray-800"
  }

  const weeks: (Date | null)[][] = []
  let currentWeek: (Date | null)[] = new Array(startDate.getDay()).fill(null)

  days.forEach((day) => {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
    currentWeek.push(day)
  })

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null)
    }
    weeks.push(currentWeek)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Contribution Activity ({currentYear})</h3>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Green squares indicate completed tasks. Darker green means more tasks completed.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-sm text-muted-foreground">Loading contribution data...</p>
        </div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <div className="flex">
            <div className="grid gap-1 mr-2" style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}>
              <span className="h-3 text-xs text-muted-foreground flex items-center">Mon</span>
              <span className="h-3 text-xs text-muted-foreground flex items-center">Wed</span>
              <span className="h-3 text-xs text-muted-foreground flex items-center">Fri</span>
              <span className="h-3"></span>
              <span className="h-3"></span>
              <span className="h-3"></span>
              <span className="h-3"></span>
            </div>

            <div className="grid auto-cols-min grid-flow-col gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-rows-7 gap-1">
                  {week.map((day, dayIndex) =>
                    day ? (
                      <TooltipProvider key={`day-${weekIndex}-${dayIndex}`}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className={cn("h-3 w-3 rounded-sm transition-colors", getColorIntensity(day))} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-xs">
                              <p className="font-medium">{format(day, "MMM d, yyyy")}</p>
                              {isCompletedDay(day) ? (
                                <p>{completedData.completedTasks} of {completedData.TotalTasks} tasks completed</p>
                              ) : (
                                <p>No tasks completed</p>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <div key={`empty-${weekIndex}-${dayIndex}`} className="h-3 w-3" />
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end gap-3 text-xs">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="h-3 w-3 rounded-sm bg-gray-100 dark:bg-gray-800" />
          <div className="h-3 w-3 rounded-sm bg-green-100 dark:bg-green-900" />
          <div className="h-3 w-3 rounded-sm bg-green-300 dark:bg-green-700" />
          <div className="h-3 w-3 rounded-sm bg-green-500 dark:bg-green-500" />
          <div className="h-3 w-3 rounded-sm bg-green-700 dark:bg-green-300" />
        </div>
        <span>More</span>
      </div>

      <TaskCompletionSummary data={completedData}></TaskCompletionSummary>
    </div>
  )
}
