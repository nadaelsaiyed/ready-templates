"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Heart,
  Settings,
  Edit,
  Globe,
  Building,
  ShieldAlert,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

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

function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <Skeleton className="h-32 w-32 rounded-full" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-5 w-32" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    </div>
  )
}

function UnauthorizedAccess() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                <ShieldAlert className="h-10 w-10 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-3">Access Denied</h1>
              <p className="text-muted-foreground mb-6">
                You don&apos;t have permission to view this profile. You can only access your own profile.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => router.push("/profile")} className="gap-2">
                  Go to My Profile
                </Button>
                <Button variant="outline" onClick={() => router.push("/")} className="gap-2 bg-transparent">
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function UserProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { user: authUser, isAuthenticated, isLoading: authLoading } = useAuth()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const profileId = Number(params.id)
  const isAuthorized = isAuthenticated && authUser?.id === profileId

  useEffect(() => {
    if (authLoading) return

    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }

    if (!isAuthorized) {
      setLoading(false)
      return
    }

    const fetchUser = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`https://fakestoreapi.com/users/${params.id}`)
        if (!response.ok) throw new Error("User not found")
        const data = await response.json()
        setUser(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchUser()
    }
  }, [params.id, authLoading, isAuthenticated, isAuthorized, router])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <ProfileSkeleton />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!isAuthorized && !loading) {
    return <UnauthorizedAccess />
  }

  const fullName = user ? `${user.name.firstname} ${user.name.lastname}` : ""
  const initials = user ? `${user.name.firstname[0]}${user.name.lastname[0]}`.toUpperCase() : ""

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-8 gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => router.push("/users")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Users
          </Button>

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={() => router.push("/users")} variant="outline">
                Return to Users
              </Button>
            </div>
          )}

          {/* Loading State */}
          {loading && <ProfileSkeleton />}

          {/* Profile Content */}
          {!loading && !error && user && (
            <div className="space-y-8">
              {/* Profile Header */}
              <div className="relative">
                {/* Cover Background */}
                <div className="h-48 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 border border-border/50" />

                {/* Profile Info */}
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 px-6">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                      alt={fullName}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground capitalize">{fullName}</h1>
                        <p className="text-muted-foreground">@{user.username}</p>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" className="gap-2 bg-transparent">
                          <Edit className="h-4 w-4" />
                          Edit Profile
                        </Button>
                        <Button className="gap-2">
                          <Mail className="h-4 w-4" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <ShoppingBag className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">12</p>
                    <p className="text-sm text-muted-foreground">Templates Bought</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <Heart className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">48</p>
                    <p className="text-sm text-muted-foreground">Favorites</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <Globe className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">5</p>
                    <p className="text-sm text-muted-foreground">Projects</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">2023</p>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs Section */}
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full justify-start bg-muted/30 p-1">
                  <TabsTrigger value="about" className="gap-2">
                    <Settings className="h-4 w-4" />
                    About
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Templates
                  </TabsTrigger>
                  <TabsTrigger value="favorites" className="gap-2">
                    <Heart className="h-4 w-4" />
                    Favorites
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Info */}
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="text-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p className="text-foreground">{user.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Globe className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Username</p>
                            <p className="text-foreground">@{user.username}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Address */}
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">Address</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Street</p>
                            <p className="text-foreground capitalize">
                              {user.address.number} {user.address.street}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Building className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">City</p>
                            <p className="text-foreground capitalize">{user.address.city}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Zipcode</p>
                            <p className="text-foreground">{user.address.zipcode}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="templates" className="mt-6">
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-12 text-center">
                      <ShoppingBag className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No Templates Yet</h3>
                      <p className="text-muted-foreground mb-4">This user hasn&apos;t purchased any templates yet.</p>
                      <Button onClick={() => router.push("/templates")}>Browse Templates</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="favorites" className="mt-6">
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-12 text-center">
                      <Heart className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No Favorites Yet</h3>
                      <p className="text-muted-foreground mb-4">
                        This user hasn&apos;t added any templates to favorites.
                      </p>
                      <Button onClick={() => router.push("/templates")}>Explore Templates</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Member Badge */}
              <div className="flex justify-center">
                <Badge variant="secondary" className="bg-primary/10 text-primary px-4 py-2 text-sm">
                  Member ID: #{user.id}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
