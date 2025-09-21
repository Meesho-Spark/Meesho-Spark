import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization token required" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "meesho_spark_jwt_secret_2024") as any

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 })
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 10MB" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Upload to cloud storage (Cloudinary, AWS S3, etc.)
    // 2. Get the public URL
    // 3. Store upload record in database

    // For demo, we'll create a mock upload record
    const uploadRecord = {
      id: Date.now().toString(),
      sellerId: decoded.sellerId,
      filename: file.name,
      size: file.size,
      type: file.type,
      url: `/uploads/${Date.now()}-${file.name}`, // Mock URL
      status: "uploaded",
      createdAt: new Date(),
    }

    return NextResponse.json({
      success: true,
      data: {
        uploadId: uploadRecord.id,
        filename: uploadRecord.filename,
        url: uploadRecord.url,
        size: uploadRecord.size,
        type: uploadRecord.type,
      },
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
