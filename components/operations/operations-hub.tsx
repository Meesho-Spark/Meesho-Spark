"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Package,
  Shield,
  TrendingUp,
  Search,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  BarChart3,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function OperationsHub() {
  const [activeTab, setActiveTab] = useState("stock-alerts")
  const [filterRegion, setFilterRegion] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data
  const stockAlerts = [
    {
      id: 1,
      product: "Cotton Kurta Set",
      sku: "CKS001",
      currentStock: 5,
      threshold: 10,
      category: "Ethnic Wear",
      region: "Maharashtra",
      status: "critical",
      lastSold: "2 hours ago",
      avgSales: 3.2,
    },
    {
      id: 2,
      product: "Denim Jacket",
      sku: "DJ002",
      currentStock: 8,
      threshold: 15,
      category: "Western Wear",
      region: "Karnataka",
      status: "warning",
      lastSold: "5 hours ago",
      avgSales: 2.1,
    },
    {
      id: 3,
      product: "Sports Shoes",
      sku: "SS003",
      currentStock: 3,
      threshold: 12,
      category: "Footwear",
      region: "UP",
      status: "critical",
      lastSold: "1 hour ago",
      avgSales: 4.5,
    },
  ]

  const cashFlowData = [
    { month: "Jan", income: 45000, expenses: 32000, profit: 13000 },
    { month: "Feb", income: 52000, expenses: 35000, profit: 17000 },
    { month: "Mar", income: 48000, expenses: 33000, profit: 15000 },
    { month: "Apr", income: 61000, expenses: 38000, profit: 23000 },
    { month: "May", income: 55000, expenses: 36000, profit: 19000 },
    { month: "Jun", income: 67000, expenses: 41000, profit: 26000 },
  ]

  const protectionClaims = [
    {
      id: "PC001",
      type: "Fraud Protection",
      amount: "₹2,450",
      status: "approved",
      date: "2024-01-15",
      description: "Unauthorized transaction claim",
    },
    {
      id: "PC002",
      type: "Return Protection",
      amount: "₹1,200",
      status: "pending",
      date: "2024-01-18",
      description: "Damaged product return",
    },
    {
      id: "PC003",
      type: "Payment Protection",
      amount: "₹3,100",
      status: "processing",
      date: "2024-01-20",
      description: "Payment dispute resolution",
    },
  ]

  const regionData = [
    { name: "Maharashtra", value: 35, color: "#8B5CF6" },
    { name: "Karnataka", value: 25, color: "#06B6D4" },
    { name: "UP", value: 20, color: "#10B981" },
    { name: "Others", value: 20, color: "#F59E0B" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "processing":
        return <RefreshCw className="w-4 h-4" />
      default:
        return <XCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Operations Hub</h1>
          <p className="text-gray-600">Manage inventory, cash flow, and seller protection</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Stock Alerts</p>
                <p className="text-2xl font-bold text-red-600">3</p>
                <p className="text-sm text-gray-500">Critical items</p>
              </div>
              <div className="p-3 rounded-lg bg-red-100">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Profit</p>
                <p className="text-2xl font-bold text-green-600">₹26,000</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  +18.2%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Protection Claims</p>
                <p className="text-2xl font-bold text-blue-600">₹6,750</p>
                <p className="text-sm text-gray-500">3 active claims</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-purple-600">127</p>
                <p className="text-sm text-purple-600 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  +3 this week
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stock-alerts">Stock Alerts</TabsTrigger>
          <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
          <TabsTrigger value="protection">Seller Protection</TabsTrigger>
        </TabsList>

        {/* Stock Alerts Tab */}
        <TabsContent value="stock-alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Smart Stock Alerts
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={filterRegion} onValueChange={setFilterRegion}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="up">UP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockAlerts.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{alert.product}</h3>
                          <p className="text-sm text-gray-500">
                            SKU: {alert.sku} • {alert.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(alert.status)}>{alert.status}</Badge>
                        <p className="text-sm text-gray-500 mt-1">{alert.region}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Current Stock</p>
                        <p className="text-lg font-semibold text-red-600">{alert.currentStock}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Threshold</p>
                        <p className="text-lg font-semibold text-gray-900">{alert.threshold}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Avg Daily Sales</p>
                        <p className="text-lg font-semibold text-blue-600">{alert.avgSales}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Sold</p>
                        <p className="text-lg font-semibold text-gray-900">{alert.lastSold}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Stock Level</span>
                        <span>{Math.round((alert.currentStock / alert.threshold) * 100)}%</span>
                      </div>
                      <Progress value={(alert.currentStock / alert.threshold) * 100} className="h-2" />
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Reorder Now
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Set New Threshold
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cash Flow Tab */}
        <TabsContent value="cash-flow" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Cash Flow Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="profit" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={regionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="income" fill="#10B981" />
                  <Bar dataKey="expenses" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Seller Protection Tab */}
        <TabsContent value="protection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                Seller Protection Claims
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {protectionClaims.map((claim) => (
                  <div key={claim.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{claim.type}</h3>
                          <p className="text-sm text-gray-500">Claim ID: {claim.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{claim.amount}</p>
                        <Badge className={`${getStatusColor(claim.status)} flex items-center gap-1`}>
                          {getStatusIcon(claim.status)}
                          {claim.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{claim.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">Filed on: {claim.date}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {claim.status === "pending" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Follow Up
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-blue-900">Need Protection?</h3>
                    <p className="text-sm text-blue-700">
                      File a new claim for fraud, payment disputes, or return issues.
                    </p>
                  </div>
                  <Button className="ml-auto bg-blue-600 hover:bg-blue-700">File New Claim</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
