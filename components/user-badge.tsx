"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail } from "lucide-react"

interface UserBadgeProps {
  user: {
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
}

export function UserBadge({ user }: UserBadgeProps) {
  const initials = `${user.name.firstname[0]}${user.name.lastname[0]}`.toUpperCase()
  const fullName = `${user.name.firstname} ${user.name.lastname}`

  return (
    <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20 transition-transform duration-300 group-hover:scale-105">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} alt={fullName} />
            <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">{initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate capitalize">{fullName}</h3>
              <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                #{user.id}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-3">@{user.username}</p>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5 text-primary/70" />
                <span className="truncate">{user.email}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-3.5 w-3.5 text-primary/70" />
                <span>{user.phone}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary/70" />
                <span className="truncate capitalize">
                  {user.address.street} {user.address.number}, {user.address.city}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
