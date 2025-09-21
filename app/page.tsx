"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, ShoppingBag, TrendingUp, Shield, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const searchParams = useSearchParams()

  useEffect(() => {
    const googleError = searchParams.get("error")
    if (googleError === "google_auth_failed") {
      setError("Google authentication failed. Please try again.")
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store tokens in localStorage - no need to set them again as they're already in cookies
        // But we'll keep them in localStorage for API calls
        localStorage.setItem("accessToken", data.accessToken)
        localStorage.setItem("refreshToken", data.refreshToken)
        localStorage.setItem("user", JSON.stringify(data.user))

        setSuccess("Login successful! Redirecting...")
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 1000)
      } else {
        setError(data.error || "Login failed")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.target as HTMLFormElement)
    const sellerName = formData.get("sellerName") as string
    const sellerId = formData.get("sellerId") as string
    const email = formData.get("registerEmail") as string
    const password = formData.get("registerPassword") as string

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sellerName, sellerId, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess("Account created successfully! Please sign in.")
        // Switch to login tab
        const loginTab = document.querySelector('[value="login"]') as HTMLElement
        loginTab?.click()
      } else {
        setError(data.error || "Registration failed")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    setError("")

    try {
      console.log("[v0] Starting Google OAuth flow")
      window.location.href = "/api/auth/google"
    } catch (err) {
      console.log("[v0] Google auth error:", err)
      setError("Google authentication failed")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-amber-500 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-white space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h1 className="text-4xl font-bold">Meesho Spark</h1>
            </div>
            <p className="text-xl text-purple-100">AI-Powered Seller Platform for Meesho</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-semibold">Smart Listings</h3>
              <p className="text-sm text-purple-200">AI-enhanced product listings</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="font-semibold">Growth Analytics</h3>
              <p className="text-sm text-purple-200">Real-time performance insights</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-semibold">Seller Protection</h3>
              <p className="text-sm text-purple-200">Secure business operations</p>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to Meesho Spark</CardTitle>
            <CardDescription>Sign in to your seller account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="mb-4 border-green-200 bg-green-50 text-green-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email or Seller ID</Label>
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Enter your email or seller ID"
                      required
                      defaultValue="rajesh@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      defaultValue="password123"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sellerName">Seller Name</Label>
                      <Input id="sellerName" name="sellerName" type="text" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sellerId">Seller ID</Label>
                      <Input id="sellerId" name="sellerId" type="text" placeholder="Unique seller ID" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">Email</Label>
                    <Input
                      id="registerEmail"
                      name="registerEmail"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">Password</Label>
                    <Input
                      id="registerPassword"
                      name="registerPassword"
                      type="password"
                      placeholder="Create a strong password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 bg-transparent hover:bg-gray-50"
                onClick={handleGoogleAuth}
                disabled={isLoading}
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isLoading ? "Connecting..." : "Continue with Google"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
