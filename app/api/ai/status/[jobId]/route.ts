import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock job status storage
const jobStatuses = new Map<string, any>()

export async function GET(request: NextRequest, { params }: { params: { jobId: string } }) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization token required" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "meesho_spark_jwt_secret_2024") as any

    const { jobId } = params

    // Get job status (in real app, this would query the database)
    const jobStatus = jobStatuses.get(jobId) || {
      id: jobId,
      status: "completed",
      progress: 100,
      currentStep: "optimization",
      steps: [
        { id: "upload", label: "Image Upload", status: "completed" },
        { id: "analysis", label: "AI Analysis", status: "completed" },
        { id: "enhancement", label: "Background Removal", status: "completed" },
        { id: "content", label: "Content Generation", status: "completed" },
        { id: "optimization", label: "SEO Optimization", status: "completed" },
      ],
      result: {
        enhancedImageUrl: "/cotton-kurta-after-enhanced.jpg",
        generatedContent: {
          title: "Premium Cotton Kurta Set - Traditional Ethnic Wear",
          description:
            "Elegant and comfortable cotton kurta set perfect for festive occasions. Features intricate embroidery work, premium quality fabric, and traditional design.",
          keywords: "cotton kurta, ethnic wear, traditional dress, festival wear",
          category: "Women's Ethnic Wear",
          suggestedPrice: "₹1,299",
        },
        confidence: 94,
        processingTime: 2.8,
      },
      createdAt: new Date(),
      completedAt: new Date(),
    }

    return NextResponse.json({
      success: true,
      data: jobStatus,
    })
  } catch (error) {
    console.error("Job status error:", error)
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
  }
}
