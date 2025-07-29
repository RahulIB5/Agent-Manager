"use client"

import { useEffect, useState } from "react"
import { Users, Phone, FileText, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import API from "../services/api"

interface ListItem {
  firstName: string
  phone: string
  notes: string
}

interface DistributionList {
  _id: string
  agentId: {
    _id: string
    name: string
    email: string
  }
  items: ListItem[]
  createdAt: string
}

export default function DistributionView() {
  const [lists, setLists] = useState<DistributionList[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchLists = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await API.get("/lists")
      setLists(response.data)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch distribution lists")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLists()
  }, [])

  const totalItems = lists.reduce((acc, list) => acc + list.items.length, 0)

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Distribution View</h2>
          <p className="text-muted-foreground">Loading distribution data...</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-3 w-[150px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Distribution View</h2>
          <p className="text-muted-foreground">View current task distributions among agents.</p>
        </div>
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={fetchLists}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Distribution View</h2>
          <p className="text-muted-foreground">View current task distributions among agents.</p>
        </div>
        <Button onClick={fetchLists} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lists.length}</div>
            <p className="text-xs text-muted-foreground">Agents with assignments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">Items distributed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg per Agent</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lists.length > 0 ? Math.round(totalItems / lists.length) : 0}</div>
            <p className="text-xs text-muted-foreground">Average distribution</p>
          </CardContent>
        </Card>
      </div>

      {/* Distribution Lists */}
      {lists.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Distributions Found</h3>
            <p className="text-muted-foreground text-center mb-4">
              Upload a CSV file to create task distributions for your agents.
            </p>
            <Button onClick={() => (window.location.href = "/upload")}>Upload CSV File</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lists.map((list) => (
            <Card key={list._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{list.agentId.name}</CardTitle>
                  <Badge variant="secondary">{list.items.length} items</Badge>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {list.agentId.email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Assigned Items:</div>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {list.items.map((item, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg text-sm">
                        <div className="font-medium">{item.firstName}</div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {item.phone}
                        </div>
                        {item.notes && <div className="text-xs text-muted-foreground mt-1">{item.notes}</div>}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    Created: {new Date(list.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
