"use client"

import { useEffect, useState } from "react"
import { Users, Upload, BarChart3, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalAgents: 0,
    totalLists: 0,
    totalItems: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [agentsRes, listsRes] = await Promise.all([API.get("/agents"), API.get("/lists")])

        const totalItems = listsRes.data.reduce((acc: number, list: any) => acc + list.items.length, 0)

        setStats({
          totalAgents: agentsRes.data.length,
          totalLists: listsRes.data.length,
          totalItems,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    fetchStats()
  }, [])

  const quickActions = [
    {
      title: "Add New Agent",
      description: "Create a new agent account",
      icon: Users,
      action: () => navigate("/add-agent"),
      color: "bg-blue-500",
    },
    {
      title: "Upload CSV",
      description: "Upload and distribute lists",
      icon: Upload,
      action: () => navigate("/upload"),
      color: "bg-green-500",
    },
    {
      title: "View Distribution",
      description: "Check current distributions",
      icon: BarChart3,
      action: () => navigate("/distribution"),
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your agent management system.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAgents}</div>
            <p className="text-xs text-muted-foreground">Active agents in system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distributed Lists</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLists}</div>
            <p className="text-xs text-muted-foreground">Lists assigned to agents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalItems}</div>
            <p className="text-xs text-muted-foreground">Items across all lists</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Items/Agent</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalAgents > 0 ? Math.round(stats.totalItems / stats.totalAgents) : 0}
            </div>
            <p className="text-xs text-muted-foreground">Average distribution</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${action.color} text-white`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </div>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={action.action} className="w-full">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
