"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { DashboardHome } from "@/components/dashboard/dashboard-home"
import { AISparkMain } from "@/components/ai-spark/ai-spark-main"
import { OperationsHub } from "@/components/operations/operations-hub"
import { GrowthHub } from "@/components/growth/growth-hub"
import { IntelligenceHub } from "@/components/intelligence/intelligence-hub"
import { ProductManagement } from "@/components/products/product-management"
import { OrderManagement } from "@/components/orders/order-management"
import { SettingsHub } from "@/components/settings/settings-hub"
import { HelpSupport } from "@/components/support/help-support"

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const authSuccessCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("meesho_auth_success="))
        ?.split("=")[1]

      if (authSuccessCookie === "true") {
        const userCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("meesho_user="))
          ?.split("=")[1]

        const tokenCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("meesho_token="))
          ?.split("=")[1]

        if (userCookie && tokenCookie) {
          try {
            const userData = JSON.parse(decodeURIComponent(userCookie))
            localStorage.setItem("accessToken", tokenCookie)
            localStorage.setItem("user", JSON.stringify(userData))

            document.cookie = "meesho_auth_success=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

            console.log("[v0] Google auth successful, user data stored")
          } catch (error) {
            console.error("Error parsing cookie data:", error)
          }
        }
      }

      const accessToken = localStorage.getItem("accessToken") || tokenCookie
      const userData = localStorage.getItem("user") || userCookie

      if (!accessToken || !userData) {
        console.log("[v0] No authentication found, redirecting to login")
        router.push("/")
        return
      }

      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        console.log("[v0] User authenticated:", parsedUser.sellerName)
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.clear()
        router.push("/")
        return
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.clear()
    // Clear cookies
    document.cookie = "meesho_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "meesho_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    console.log("[v0] User logged out")
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHome onNavigate={setActiveSection} user={user} />
      case "ai-spark":
        return <AISparkMain user={user} />
      case "operations":
        return <OperationsHub user={user} />
      case "growth":
        return <GrowthHub user={user} />
      case "intelligence":
        return <IntelligenceHub user={user} />
      case "products":
        return <ProductManagement />
      case "orders":
        return <OrderManagement />
      case "settings":
        return <SettingsHub />
      case "help":
        return <HelpSupport />
      default:
        return <DashboardHome onNavigate={setActiveSection} user={user} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} user={user} />
      <div className="flex-1 flex flex-col">
        <Header activeSection={activeSection} user={user} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  )
}
