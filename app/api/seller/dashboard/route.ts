import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock dashboard data
const getDashboardData = (sellerId: string) => ({
  stats: {
    revenue: 45230,
    revenueChange: 12.5,
    products: 127,
    productsChange: 3,
    orders: 89,
    ordersChange: 8,
    rating: 4.2,
    ratingChange: 0.1,
  },
  aiStats: {
    totalEnhanced: 127,
    thisMonth: 23,
    avgImprovement: 45,
    successRate: 94,
  },
  recentActivities: [
    {
      id: 1,
      action: "New order received",
      product: "Cotton Kurta Set",
      time: "2 min ago",
      status: "success",
    },
    {
      id: 2,
      action: "Stock alert",
      product: "Denim Jacket",
      time: "15 min ago",
      status: "warning",
    },
    {
      id: 3,
      action: "AI listing created",
      product: "Silk Saree",
      time: "1 hour ago",
      status: "info",
    },
    {
      id: 4,
      action: "Payment received",
      product: "Sports Shoes",
      time: "2 hours ago",
      status: "success",
    },
  ],
  stockAlerts: [
    {
      id: 1,
      product: "Cotton Kurta Set",
      sku: "CKS001",
      currentStock: 5,
      threshold: 10,
      category: "Ethnic Wear",
      region: "Maharashtra",
      status: "critical",
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
    },
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

    const dashboardData = getDashboardData(decoded.sellerId)

    return NextResponse.json({
      success: true,
      data: dashboardData,
    })
  } catch (error) {
    console.error("Dashboard error:", error)
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
  }
}
