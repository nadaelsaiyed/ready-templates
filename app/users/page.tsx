"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UserBadge } from "@/components/user-badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Users, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface User {
  id: number
  email: string
  username: string
  password: string
  name: {
    firstname: string
    lastname: string
  }
  address: {
    city: string
    street: string
    number: number
    zipcode: string
    geolocation: {
      lat: string
      long: string
    }
  }
  phone: string
}

function UserSkeleton() {
  return (
    <Card className="border-border/50 bg-card/50">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-48" />
              <Skeleton className="h-3 w-36" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("https://fakestoreapi.com/users")
      if (!response.ok) throw new Error("Failed to fetch users")
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Users className="h-4 w-4" />
              Community
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Users</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the amazing developers and businesses using our templates to build stunning websites.
            </p>
          </div>

          {/* Refresh Button */}
          <div className="flex justify-center mb-8">
            <Button onClick={fetchUsers} disabled={loading} variant="outline" className="gap-2 bg-transparent">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh Users
            </Button>
          </div>

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={fetchUsers} variant="outline">
                Try Again
              </Button>
            </div>
          )}

          {/* Users Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <UserSkeleton key={i} />)
              : users.map((user) => <UserBadge key={user.id} user={user} />)}
          </div>

          {/* Stats */}
          {!loading && !error && (
            <div className="mt-12 text-center">
              <p className="text-muted-foreground">
                Showing <span className="text-primary font-semibold">{users.length}</span> users from the community
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
