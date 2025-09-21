"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Brain,
  TrendingUp,
  Users,
  Target,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  IndianRupee,
  MapPin,
  Calendar,
  Star,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

export function IntelligenceHub() {
  const [activeTab, setActiveTab] = useState("trending")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Sample data
  const trendingProducts = [
    {
      id: 1,
      name: "Festive Kurta Sets",
      category: "Ethnic Wear",
      growth: "+156%",
      demand: "High",
      avgPrice: "₹1,299",
      competition: "Medium",
      opportunity: "High",
      region: "Maharashtra",
    },
    {
      id: 2,
      name: "Winter Jackets",
      category: "Western Wear",
      growth: "+89%",
      demand: "Rising",
      avgPrice: "₹2,499",
      competition: "High",
      opportunity: "Medium",
      region: "Delhi",
    },
    {
      id: 3,
      name: "Sports Shoes",
      category: "Footwear",
      growth: "+67%",
      demand: "Steady",
      avgPrice: "₹1,899",
      competition: "High",
      opportunity: "Low",
      region: "Karnataka",
    },
  ]

  const customerDemographics = {
    ageGroups: [
      { name: "18-25", value: 35, color: "#8B5CF6" },
      { name: "26-35", value: 40, color: "#06B6D4" },
      { name: "36-45", value: 20, color: "#10B981" },
      { name: "45+", value: 5, color: "#F59E0B" },
    ],
    regions: [
      { name: "Maharashtra", value: 35, growth: "+12%" },
      { name: "Karnataka", value: 25, growth: "+8%" },
      { name: "UP", value: 20, growth: "+15%" },
      { name: "Delhi", value: 12, growth: "+5%" },
      { name: "Others", value: 8, growth: "+10%" },
    ],
    preferences: [
      { category: "Ethnic Wear", percentage: 45, trend: "up" },
      { category: "Western Wear", percentage: 30, trend: "up" },
      { category: "Footwear", percentage: 15, trend: "stable" },
      { category: "Accessories", percentage: 10, trend: "down" },
    ],
  }

  const marketOpportunities = [
    {
      id: 1,
      title: "Festive Season Opportunity",
      description: "High demand for ethnic wear in Maharashtra region",
      potential: "₹45,000",
      confidence: 92,
      timeframe: "Next 30 days",
      action: "Increase ethnic wear inventory",
      category: "Seasonal",
    },
    {
      id: 2,
      title: "Winter Collection Gap",
      description: "Low competition in premium winter wear segment",
      potential: "₹32,000",
      confidence: 78,
      timeframe: "Next 60 days",
      action: "Launch winter collection",
      category: "Product Gap",
    },
    {
      id: 3,
      title: "Regional Expansion",
      description: "Untapped market in Rajasthan for traditional wear",
      potential: "₹28,000",
      confidence: 85,
      timeframe: "Next 90 days",
      action: "Expand to Rajasthan market",
      category: "Geographic",
    },
  ]

  const demandForecast = [
    { month: "Jul", ethnic: 120, western: 80, footwear: 60 },
    { month: "Aug", ethnic: 140, western: 85, footwear: 65 },
    { month: "Sep", ethnic: 180, western: 90, footwear: 70 },
    { month: "Oct", ethnic: 220, western: 95, footwear: 75 },
    { month: "Nov", ethnic: 280, western: 100, footwear: 80 },
    { month: "Dec", ethnic: 320, western: 110, footwear: 85 },
  ]

  const getGrowthColor = (growth: string) => {
    if (growth.startsWith("+")) {
      return "text-green-600"
    } else if (growth.startsWith("-")) {
      return "text-red-600"
    }
    return "text-gray-600"
  }

  const getOpportunityColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Intelligence Hub</h1>
          <p className="text-gray-600">Market insights and analytics</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="maharashtra">Maharashtra</SelectItem>
              <SelectItem value="karnataka">Karnataka</SelectItem>
              <SelectItem value="up">UP</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Brain className="w-4 h-4 mr-2" />
            Generate Insights
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Market Opportunities</p>
                <p className="text-2xl font-bold text-purple-600">15</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  +3 new this week
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Trending Products</p>
                <p className="text-2xl font-bold text-green-600">23</p>
                <p className="text-sm text-green-600">High growth potential</p>
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
                <p className="text-sm font-medium text-gray-600">Customer Segments</p>
                <p className="text-2xl font-bold text-blue-600">8</p>
                <p className="text-sm text-gray-500">Active segments</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue Potential</p>
                <p className="text-2xl font-bold text-amber-600">₹1.05L</p>
                <p className="text-sm text-amber-600">Next 90 days</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-100">
                <IndianRupee className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trending">Trending Products</TabsTrigger>
          <TabsTrigger value="demographics">Customer Demographics</TabsTrigger>
          <TabsTrigger value="opportunities">Market Opportunities</TabsTrigger>
        </TabsList>

        {/* Trending Products Tab */}
        <TabsContent value="trending" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Trending Products by Region
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Search products..." className="pl-10 w-64" />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="ethnic">Ethnic Wear</SelectItem>
                      <SelectItem value="western">Western Wear</SelectItem>
                      <SelectItem value="footwear">Footwear</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${getGrowthColor(product.growth)}`}>{product.growth}</p>
                        <p className="text-sm text-gray-500">{product.region}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Demand</p>
                        <Badge className={getOpportunityColor(product.demand)}>{product.demand}</Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Avg Price</p>
                        <p className="font-semibold text-gray-900">{product.avgPrice}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Competition</p>
                        <Badge className={getOpportunityColor(product.competition)}>{product.competition}</Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Opportunity</p>
                        <Badge className={getOpportunityColor(product.opportunity)}>{product.opportunity}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Analyze
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Demand Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={demandForecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="ethnic" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" />
                  <Area type="monotone" dataKey="western" stackId="1" stroke="#06B6D4" fill="#06B6D4" />
                  <Area type="monotone" dataKey="footwear" stackId="1" stroke="#10B981" fill="#10B981" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer Demographics Tab */}
        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Age Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerDemographics.ageGroups}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {customerDemographics.ageGroups.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerDemographics.regions.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{region.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{region.value}%</p>
                        <p className="text-sm text-green-600">{region.growth}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Category Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerDemographics.preferences.map((pref, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{pref.category}</span>
                      <div className="flex items-center gap-2">
                        <span>{pref.percentage}%</span>
                        {pref.trend === "up" ? (
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                        ) : pref.trend === "down" ? (
                          <ArrowDownRight className="w-4 h-4 text-red-500" />
                        ) : (
                          <div className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${pref.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Market Opportunities Tab */}
        <TabsContent value="opportunities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                Market Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {marketOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-900">{opportunity.title}</h3>
                        <p className="text-gray-600">{opportunity.description}</p>
                        <Badge variant="outline">{opportunity.category}</Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{opportunity.potential}</p>
                        <p className="text-sm text-gray-500">Revenue Potential</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Confidence Score</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${opportunity.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{opportunity.confidence}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Timeframe</p>
                        <p className="font-medium flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {opportunity.timeframe}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Recommended Action</p>
                        <p className="font-medium">{opportunity.action}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Target className="w-4 h-4 mr-2" />
                        Take Action
                      </Button>
                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline">
                        <Star className="w-4 h-4 mr-2" />
                        Save for Later
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
