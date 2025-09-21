"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Download,
  Filter,
  MapPin,
  TrendingUp,
  Users,
  ShoppingBag,
  IndianRupee,
  FileText,
  BarChart3,
} from "lucide-react"

const DUMMY_REPORTS = [
  {
    id: "sales-summary",
    name: "Sales Summary Report",
    description: "Complete sales overview with revenue, orders, and growth metrics",
    lastGenerated: "2 hours ago",
    downloads: 1247,
    type: "sales",
  },
  {
    id: "regional-performance",
    name: "Regional Performance Report",
    description: "State-wise and city-wise sales performance analysis",
    lastGenerated: "1 day ago",
    downloads: 892,
    type: "regional",
  },
  {
    id: "product-analytics",
    name: "Product Analytics Report",
    description: "Top performing products, categories, and inventory insights",
    lastGenerated: "3 hours ago",
    downloads: 1456,
    type: "product",
  },
  {
    id: "customer-insights",
    name: "Customer Insights Report",
    description: "Customer behavior, demographics, and purchase patterns",
    lastGenerated: "5 hours ago",
    downloads: 734,
    type: "customer",
  },
]

const REGIONS = [
  "All Regions",
  "North India",
  "South India",
  "East India",
  "West India",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Gujarat",
  "Rajasthan",
  "Uttar Pradesh",
  "West Bengal",
  "Andhra Pradesh",
  "Telangana",
  "Kerala",
]

const MONTHS = [
  "Last 30 days",
  "January 2024",
  "February 2024",
  "March 2024",
  "April 2024",
  "May 2024",
  "June 2024",
  "July 2024",
  "August 2024",
  "September 2024",
  "October 2024",
  "November 2024",
  "December 2024",
]

export function ReportsDashboard() {
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [selectedMonth, setSelectedMonth] = useState("Last 30 days")
  const [dateRange, setDateRange] = useState({ from: "", to: "" })
  const [isGenerating, setIsGenerating] = useState<string | null>(null)

  const generateReport = async (reportId: string) => {
    setIsGenerating(reportId)

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create and download a dummy CSV file
    const csvContent = `Report: ${reportId}\nGenerated: ${new Date().toLocaleString()}\nRegion: ${selectedRegion}\nPeriod: ${selectedMonth}\n\nSample Data:\nProduct,Sales,Revenue\nKurta Set,1247,₹15,58,830\nSaree,892,₹22,14,560\nLehenga,456,₹45,67,200`

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${reportId}-${Date.now()}.csv`
    a.click()
    window.URL.revokeObjectURL(url)

    setIsGenerating(null)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate detailed reports with custom filters and date ranges</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Downloads</p>
            <p className="text-2xl font-bold text-blue-600">4,329</p>
            <p className="text-sm text-gray-500">this month</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Region</Label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Time Period</Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>From Date</Label>
              <Input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange((prev) => ({ ...prev, from: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>To Date</Label>
              <Input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange((prev) => ({ ...prev, to: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">₹12,45,678</p>
                <p className="text-sm text-green-600">+23% from last month</p>
              </div>
              <IndianRupee className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold text-blue-600">8,947</p>
                <p className="text-sm text-blue-600">+18% from last month</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Customers</p>
                <p className="text-2xl font-bold text-purple-600">15,234</p>
                <p className="text-sm text-purple-600">+12% from last month</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Growth Rate</p>
                <p className="text-2xl font-bold text-orange-600">+34.5%</p>
                <p className="text-sm text-orange-600">vs last quarter</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DUMMY_REPORTS.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-2">
                    {report.type === "sales" && <BarChart3 className="w-5 h-5 text-green-600" />}
                    {report.type === "regional" && <MapPin className="w-5 h-5 text-blue-600" />}
                    {report.type === "product" && <ShoppingBag className="w-5 h-5 text-purple-600" />}
                    {report.type === "customer" && <Users className="w-5 h-5 text-orange-600" />}
                    {report.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
                <Badge variant="secondary">{report.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Last generated: {report.lastGenerated}</span>
                  <span>{report.downloads.toLocaleString()} downloads</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => generateReport(report.id)}
                    disabled={isGenerating === report.id}
                    className="flex-1"
                  >
                    {isGenerating === report.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Generate & Download
                      </>
                    )}
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Report Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { report: "Sales Summary Report", user: "Rajesh Kumar", time: "2 hours ago", action: "Downloaded" },
              { report: "Regional Performance", user: "Priya Sharma", time: "4 hours ago", action: "Generated" },
              { report: "Product Analytics", user: "Amit Singh", time: "1 day ago", action: "Downloaded" },
              { report: "Customer Insights", user: "Sneha Patel", time: "1 day ago", action: "Generated" },
              { report: "Sales Summary Report", user: "Vikram Gupta", time: "2 days ago", action: "Downloaded" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {activity.user} {activity.action.toLowerCase()} {activity.report}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <Badge variant={activity.action === "Downloaded" ? "default" : "secondary"}>{activity.action}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
