"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Target, TrendingUp, Calendar } from "lucide-react"

export default function ProfilePage() {
  const [userStats, setUserStats] = useState({
    name: "John Doe",
    email: "john@example.com",
    totalBooksRead: 12,
    totalPagesRead: 3420,
    currentlyReading: 3,
    averagePagesPerDay: 15,
    readingStreak: 7,
    joinDate: "January 2024",
  })

  useEffect(() => {
    // Load user data from localStorage (mock data)
    const userName = localStorage.getItem("userName") || "John Doe"
    const userEmail = localStorage.getItem("userEmail") || "john@example.com"
    setUserStats((prev) => ({
      ...prev,
      name: userName,
      email: userEmail,
    }))
  }, [])

  const statCards = [
    {
      title: "Books Completed",
      value: userStats.totalBooksRead,
      icon: BookOpen,
      description: "Total books finished",
      color: "text-green-600",
    },
    {
      title: "Pages Read",
      value: userStats.totalPagesRead.toLocaleString(),
      icon: TrendingUp,
      description: "Total pages read",
      color: "text-blue-600",
    },
    {
      title: "Currently Reading",
      value: userStats.currentlyReading,
      icon: Target,
      description: "Books in progress",
      color: "text-orange-600",
    },
    {
      title: "Reading Streak",
      value: `${userStats.readingStreak} days`,
      icon: Calendar,
      description: "Consecutive reading days",
      color: "text-purple-600",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {userStats.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{userStats.name}</h1>
              <p className="text-gray-600">{userStats.email}</p>
              <Badge variant="secondary" className="mt-1">
                Member since {userStats.joinDate}
              </Badge>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reading Goals */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Reading Goals</CardTitle>
            <CardDescription>Your progress towards this year's reading goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Annual Reading Goal</span>
                  <span>{userStats.totalBooksRead}/24 books</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(userStats.totalBooksRead / 24) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Daily Reading Goal</span>
                  <span>{userStats.averagePagesPerDay}/20 pages</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(userStats.averagePagesPerDay / 20) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest reading updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Finished reading "1984"</p>
                  <p className="text-sm text-gray-600">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Updated progress on "The Great Gatsby"</p>
                  <p className="text-sm text-gray-600">3 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Target className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">Started reading "Pride and Prejudice"</p>
                  <p className="text-sm text-gray-600">1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
