"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: number
  email: string
  username: string
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

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  register: (userData: {
    email: string
    username: string
    password: string
    firstname: string
    lastname: string
  }) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  updateUser: (updatedUser: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Fetch all users from API
      const response = await fetch("https://fakestoreapi.com/users")
      const users: User[] = await response.json()

      // Find matching user
      const foundUser = users.find((u) => u.username === username || u.email === username)

      if (foundUser) {
        setUser(foundUser)
        localStorage.setItem("auth_user", JSON.stringify(foundUser))
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (userData: {
    email: string
    username: string
    password: string
    firstname: string
    lastname: string
  }): Promise<boolean> => {
    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          username: userData.username,
          password: userData.password,
          name: {
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
          address: {
            city: "",
            street: "",
            number: 0,
            zipcode: "",
            geolocation: {
              lat: "0",
              long: "0",
            },
          },
          phone: "",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        // Create user object with returned id
        const newUser: User = {
          id: data.id,
          email: userData.email,
          username: userData.username,
          name: {
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
          address: {
            city: "",
            street: "",
            number: 0,
            zipcode: "",
            geolocation: {
              lat: "0",
              long: "0",
            },
          },
          phone: "",
        }
        setUser(newUser)
        localStorage.setItem("auth_user", JSON.stringify(newUser))
        return true
      }
      return false
    } catch (error) {
      console.error("Register error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth_user")
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem("auth_user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
