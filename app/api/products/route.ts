import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock products database
const mockProducts = [
  {
    id: "1",
    sellerId: "MS12345",
    title: "Premium Cotton Kurta Set - Traditional Ethnic Wear",
    description:
      "Elegant and comfortable cotton kurta set perfect for festive occasions. Features intricate embroidery work, premium quality fabric, and traditional design.",
    category: "Ethnic Wear",
    subcategory: "Kurta Sets",
    images: ["/cotton-kurta-after-enhanced.jpg"],
    originalImages: ["/cotton-kurta-before.jpg"],
    mrp: 1999,
    sellingPrice: 1299,
    discount: 35,
    totalStock: 50,
    availableStock: 45,
    lowStockThreshold: 10,
    variants: [
      { size: "S", color: "Blue", stock: 15, sku: "CKS001-S-BL" },
      { size: "M", color: "Blue", stock: 20, sku: "CKS001-M-BL" },
      { size: "L", color: "Blue", stock: 10, sku: "CKS001-L-BL" },
    ],
    keywords: ["cotton kurta", "ethnic wear", "traditional dress", "festival wear"],
    isAIGenerated: true,
    views: 1250,
    orders: 45,
    conversionRate: 3.6,
    rating: 4.2,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    sellerId: "MS12345",
    title: "Stylish Denim Jacket - Premium Quality",
    description: "Trendy denim jacket perfect for casual outings. Made with high-quality denim fabric and modern fit.",
    category: "Western Wear",
    subcategory: "Jackets",
    images: ["/denim-jacket.jpg"],
    originalImages: ["/denim-jacket-original.jpg"],
    mrp: 2999,
    sellingPrice: 2499,
    discount: 17,
    totalStock: 30,
    availableStock: 8,
    lowStockThreshold: 15,
    variants: [
      { size: "M", color: "Blue", stock: 3, sku: "DJ002-M-BL" },
      { size: "L", color: "Blue", stock: 5, sku: "DJ002-L-BL" },
    ],
    keywords: ["denim jacket", "western wear", "casual wear", "trendy"],
    isAIGenerated: false,
    views: 890,
    orders: 22,
    conversionRate: 2.5,
    rating: 4.0,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
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

    // Filter products by seller
    const sellerProducts = mockProducts.filter((p) => p.sellerId === decoded.sellerId)

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    let filteredProducts = sellerProducts

    // Apply filters
    if (category && category !== "all") {
      filteredProducts = filteredProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    }

    if (search) {
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()) ||
          p.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase())),
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        products: paginatedProducts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredProducts.length / limit),
          totalProducts: filteredProducts.length,
          hasNext: endIndex < filteredProducts.length,
          hasPrev: page > 1,
        },
      },
    })
  } catch (error) {
    console.error("Products fetch error:", error)
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization token required" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "meesho_spark_jwt_secret_2024") as any

    const productData = await request.json()

    // Create new product
    const newProduct = {
      id: Date.now().toString(),
      sellerId: decoded.sellerId,
      ...productData,
      views: 0,
      orders: 0,
      conversionRate: 0,
      rating: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    mockProducts.push(newProduct)

    return NextResponse.json({
      success: true,
      data: newProduct,
    })
  } catch (error) {
    console.error("Product creation error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
