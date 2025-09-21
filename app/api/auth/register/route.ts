import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { mockUsers } from "@/lib/mock-users"

export async function POST(request: NextRequest) {
  try {
    const { sellerName, sellerId, email, password } = await request.json()

    if (!sellerName || !sellerId || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const existingUser = mockUsers.find((u) => u.email === email || u.sellerId === sellerId)

    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email or seller ID" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = {
      id: Date.now().toString(),
      sellerId,
      sellerName,
      email,
      password: hashedPassword,
      businessName: `${sellerName}'s Store`,
      phone: "",
      address: "",
      mTrustLevel: 1,
      mTrustScore: 25,
      createdAt: new Date(),
      lastLogin: new Date(),
    }

    mockUsers.push(newUser)

    // Return success without tokens (user needs to login)
    return NextResponse.json({
      success: true,
      message: "Account created successfully. Please sign in.",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
