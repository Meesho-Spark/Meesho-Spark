"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Zap,
  Shield,
  Target,
  Award,
  ArrowUpRight,
  Download,
  Share2,
  Play,
  Eye,
  ExternalLink,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

export function GrowthHub() {
  const [activeTab, setActiveTab] = useState("ai-stats")

  // Sample data
  const aiStats = {
    totalEnhanced: 127,
    thisMonth: 23,
    avgImprovement: 45,
    successRate: 94,
  }

  const aiPerformanceData = [
    { month: "Jan", enhanced: 15, revenue: 12000, ctr: 2.3 },
    { month: "Feb", enhanced: 22, revenue: 18500, ctr: 3.1 },
    { month: "Mar", enhanced: 18, revenue: 15200, ctr: 2.8 },
    { month: "Apr", enhanced: 31, revenue: 24800, ctr: 3.7 },
    { month: "May", enhanced: 28, revenue: 22100, ctr: 3.4 },
    { month: "Jun", enhanced: 23, revenue: 19600, ctr: 3.2 },
  ]

  const mTrustProgress = {
    currentLevel: 3,
    currentScore: 72,
    nextLevelScore: 80,
    badges: ["Verified Seller", "Quality Products", "Fast Shipping"],
    pendingBadges: ["Customer Champion", "Top Rated"],
  }

  const marketingCampaigns = [
    {
      id: 1,
      name: "Festival Sale Campaign",
      type: "Social Media",
      status: "active",
      reach: "12.5K",
      engagement: "8.2%",
      conversions: 156,
      budget: "₹5,000",
      spent: "₹3,200",
    },
    {
      id: 2,
      name: "New Collection Launch",
      type: "Banner Ad",
      status: "completed",
      reach: "8.3K",
      engagement: "6.7%",
      conversions: 89,
      budget: "₹3,000",
      spent: "₹3,000",
    },
  ]

  const adCredits = {
    total: 15000,
    used: 8200,
    remaining: 6800,
    thisMonth: 3200,
  }

  const socialContent = [
    {
      id: 1,
      type: "Instagram Post",
      product: "Cotton Kurta Set",
      engagement: "245 likes, 12 comments",
      reach: "1.2K",
      status: "published",
    },
    {
      id: 2,
      type: "Facebook Story",
      product: "Denim Jacket",
      engagement: "89 views, 5 shares",
      reach: "456",
      status: "published",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Growth Hub</h1>
          <p className="text-gray-600">AI tools, marketing, and M-Trust certification</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Growth Report
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Target className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Enhanced</p>
                <p className="text-2xl font-bold text-purple-600">{aiStats.totalEnhanced}</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />+{aiStats.thisMonth} this month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">M-Trust Level</p>
                <p className="text-2xl font-bold text-blue-600">{mTrustProgress.currentLevel}</p>
                <p className="text-sm text-gray-500">{mTrustProgress.currentScore}/100 score</p>
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
                <p className="text-sm font-medium text-gray-600">Ad Credits</p>
                <p className="text-2xl font-bold text-green-600">₹{adCredits.remaining.toLocaleString()}</p>
                <p className="text-sm text-gray-500">₹{adCredits.used.toLocaleString()} used</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg CTR Boost</p>
                <p className="text-2xl font-bold text-amber-600">+{aiStats.avgImprovement}%</p>
                <p className="text-sm text-amber-600">{aiStats.successRate}% success rate</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-100">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ai-stats">AI Statistics</TabsTrigger>
          <TabsTrigger value="mtrust">M-Trust</TabsTrigger>
          <TabsTrigger value="marketing">Marketing Tools</TabsTrigger>
        </TabsList>

        {/* AI Statistics Tab */}
        <TabsContent value="ai-stats" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-500" />
                  AI Enhancement Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={aiPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="enhanced" stroke="#8B5CF6" strokeWidth={2} />
                    <Line type="monotone" dataKey="ctr" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <img
                        src="/cotton-kurta-before.jpg"
                        alt="Before"
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <p className="text-xs text-gray-500 text-center">Before</p>
                    </div>
                    <div className="space-y-2">
                      <img
                        src="/cotton-kurta-after-enhanced.jpg"
                        alt="After"
                        className="w-full h-24 object-cover rounded-lg border shadow-md"
                      />
                      <p className="text-xs text-gray-500 text-center">After AI</p>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <h4 className="font-semibold text-sm">Cotton Kurta Set</h4>
                    <div className="flex justify-center gap-4 text-xs">
                      <span className="text-green-600">+67% CTR</span>
                      <span className="text-blue-600">+45% Sales</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={aiPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* M-Trust Tab */}
        <TabsContent value="mtrust" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                M-Trust Certification Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{mTrustProgress.currentLevel}</p>
                    <p className="text-xs text-blue-600">Level</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Level {mTrustProgress.currentLevel} Seller</h3>
                  <p className="text-gray-600">
                    {mTrustProgress.nextLevelScore - mTrustProgress.currentScore} points to Level{" "}
                    {mTrustProgress.currentLevel + 1}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Next Level</span>
                  <span>
                    {mTrustProgress.currentScore}/{mTrustProgress.nextLevelScore}
                  </span>
                </div>
                <Progress value={(mTrustProgress.currentScore / mTrustProgress.nextLevelScore) * 100} className="h-3" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-600">Earned Badges</h4>
                  {mTrustProgress.badges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Award className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">{badge}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-600">Available Badges</h4>
                  {mTrustProgress.pendingBadges.map((badge, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-gray-400" />
                        <span className="font-medium text-gray-600">{badge}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Marketing Tools Tab */}
        <TabsContent value="marketing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-500" />
                  Active Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketingCampaigns.map((campaign) => (
                    <div key={campaign.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                          <p className="text-sm text-gray-500">{campaign.type}</p>
                        </div>
                        <Badge
                          className={
                            campaign.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Reach</p>
                          <p className="font-semibold">{campaign.reach}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Engagement</p>
                          <p className="font-semibold text-blue-600">{campaign.engagement}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Conversions</p>
                          <p className="font-semibold text-green-600">{campaign.conversions}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Spent</p>
                          <p className="font-semibold">{campaign.spent}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        {campaign.status === "active" && (
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4 mr-2" />
                            Pause
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ad Credits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <p className="text-3xl font-bold text-green-600">₹{adCredits.remaining.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Remaining Credits</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Used this month</span>
                    <span>₹{adCredits.thisMonth.toLocaleString()}</span>
                  </div>
                  <Progress value={(adCredits.used / adCredits.total) * 100} className="h-2" />
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Target className="w-4 h-4 mr-2" />
                  Create New Campaign
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Social Media Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {socialContent.map((content) => (
                  <div key={content.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{content.type}</h3>
                        <p className="text-sm text-gray-500">{content.product}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{content.status}</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{content.engagement}</p>
                      <p className="text-sm text-gray-500">Reach: {content.reach}</p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Post
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
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
