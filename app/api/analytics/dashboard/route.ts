import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock analytics data
const getAnalyticsData = (sellerId: string) => ({
  revenue: {
    current: 45230,
    previous: 40250,
    change: 12.4,
    trend: "up",
    data: [
      { month: "Jan", value: 32000 },
      { month: "Feb", value: 35000 },
      { month: "Mar", value: 33000 },
      { month: "Apr", value: 38000 },
      { month: "May", value: 36000 },
      { month: "Jun", value: 45230 },
    ],
  },
  orders: {
    current: 89,
    previous: 82,
    change: 8.5,
    trend: "up",
    data: [
      { month: "Jan", value: 65 },
      { month: "Feb", value: 72 },
      { month: "Mar", value: 68 },
      { month: "Apr", value: 78 },
      { month: "May", value: 75 },
      { month: "Jun", value: 89 },
    ],
  },
  topProducts: [
    {
      id: "1",
      name: "Cotton Kurta Set",
      revenue: 15600,
      orders: 45,
      views: 1250,
      conversionRate: 3.6,
    },
    {
      id: "2",
      name: "Denim Jacket",
      revenue: 12400,
      orders: 22,
      views: 890,
      conversionRate: 2.5,
    },
  ],
  customerDemographics: {
    ageGroups: [
      { name: "18-25", value: 35 },
      { name: "26-35", value: 40 },
      { name: "36-45", value: 20 },
      { name: "45+", value: 5 },
    ],
    regions: [
      { name: "Maharashtra", value: 35, growth: 12 },
      { name: "Karnataka", value: 25, growth: 8 },
      { name: "UP", value: 20, growth: 15 },
      { name: "Delhi", value: 12, growth: 5 },
      { name: "Others", value: 8, growth: 10 },
    ],
  },
  trafficSources: [
    { source: "Organic Search", percentage: 45, visitors: 2250 },
    { source: "Direct", percentage: 30, visitors: 1500 },
    { source: "Social Media", percentage: 15, visitors: 750 },
    { source: "Referral", percentage: 10, visitors: 500 },
  ],
})

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization token required" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "meesho_spark_jwt_secret_2024") as any

    const analyticsData = getAnalyticsData(decoded.sellerId)

    return NextResponse.json({
      success: true,
      data: analyticsData,
    })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
  }
}
