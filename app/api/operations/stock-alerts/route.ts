import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock stock alerts data
const getStockAlerts = (sellerId: string) => [
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
    reorderSuggestion: 25,
    estimatedStockout: "3 days",
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
    reorderSuggestion: 20,
    estimatedStockout: "7 days",
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
    reorderSuggestion: 30,
    estimatedStockout: "2 days",
  },
]

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization token required" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "meesho_spark_jwt_secret_2024") as any

    const { searchParams } = new URL(request.url)
    const region = searchParams.get("region")
    const status = searchParams.get("status")

    let alerts = getStockAlerts(decoded.sellerId)

    // Apply filters
    if (region && region !== "all") {
      alerts = alerts.filter((alert) => alert.region.toLowerCase() === region.toLowerCase())
    }

    if (status && status !== "all") {
      alerts = alerts.filter((alert) => alert.status === status)
    }

    return NextResponse.json({
      success: true,
      data: {
        alerts,
        summary: {
          total: alerts.length,
          critical: alerts.filter((a) => a.status === "critical").length,
          warning: alerts.filter((a) => a.status === "warning").length,
        },
      },
    })
  } catch (error) {
    console.error("Stock alerts error:", error)
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
  }
}
