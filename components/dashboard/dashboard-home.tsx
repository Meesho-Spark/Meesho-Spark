"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  IndianRupee,
  Package,
  ShoppingBag,
  Star,
  ArrowUpRight,
  Activity,
  Upload,
  Zap,
  BarChart3,
  TrendingUp,
  Brain,
  Target,
  Shield,
} from "lucide-react"

interface DashboardHomeProps {
  onNavigate?: (section: string) => void
}

export function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const stats = [
    {
      title: "Revenue",
      value: "₹45,230",
      change: "+12.5%",
      icon: IndianRupee,
      color: "text-green-600",
    },
    {
      title: "Products",
      value: "127",
      change: "+3",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Orders",
      value: "89",
      change: "+8",
      icon: ShoppingBag,
      color: "text-purple-600",
    },
    {
      title: "Rating",
      value: "4.2",
      change: "+0.1",
      icon: Star,
      color: "text-amber-600",
    },
  ]

  const hubs = [
    {
      id: "operations",
      name: "Operations",
      icon: BarChart3,
      description: "Manage inventory, cash flow, and protection",
      color: "bg-blue-500",
      stats: "3 alerts",
    },
    {
      id: "growth",
      name: "Growth",
      icon: TrendingUp,
      description: "AI tools, marketing, and M-Trust certification",
      color: "bg-green-500",
      stats: "127 AI listings",
    },
    {
      id: "intelligence",
      name: "Intelligence",
      icon: Brain,
      description: "Market insights and analytics",
      color: "bg-purple-500",
      stats: "15 opportunities",
    },
  ]

  const recentActivities = [
    { action: "New order received", product: "Cotton Kurta Set", time: "2 min ago", status: "success" },
    { action: "Stock alert", product: "Denim Jacket", time: "15 min ago", status: "warning" },
    { action: "AI listing created", product: "Silk Saree", time: "1 hour ago", status: "info" },
    { action: "Payment received", product: "Sports Shoes", time: "2 hours ago", status: "success" },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.color} flex items-center gap-1`}>
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-100`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Spark Spotlight */}
      <Card className="bg-gradient-to-r from-purple-600 to-amber-500 text-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8" />
                <h2 className="text-3xl font-bold">AI Spark</h2>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  NEW
                </Badge>
              </div>
              <p className="text-xl text-purple-100">Transform your product images with AI-powered enhancement</p>
              <p className="text-purple-200">
                Upload any product image and get professional listings with enhanced photos, compelling descriptions,
                and optimized keywords in seconds.
              </p>
            </div>
            <div className="text-center space-y-4">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => onNavigate?.("ai-spark")}
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload & Enhance
              </Button>
              <p className="text-sm text-purple-200">127 products enhanced this month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Three Hubs Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hubs.map((hub) => (
          <Card key={hub.id} className="cursor-pointer transition-all hover:shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${hub.color}`}>
                      <hub.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{hub.name}</h3>
                      <p className="text-sm text-gray-500">{hub.stats}</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{hub.description}</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Explore {hub.name}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-gray-600 text-sm">{activity.product}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                  <Badge
                    variant={
                      activity.status === "success"
                        ? "default"
                        : activity.status === "warning"
                          ? "destructive"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Package className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Shield className="w-4 h-4 mr-2" />
              Check Protection Status
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Target className="w-4 h-4 mr-2" />
              Marketing Tools
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
