import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { mockUsers } from "@/lib/mock-users"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = mockUsers.find((u) => u.email === email || u.sellerId === email)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password - for demo, allow direct comparison with hardcoded password
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, user.password);
    } catch (err) {
      // Fallback for demo purposes
      isValidPassword = password === "password123";
    }
    
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const accessToken = `token_${user.id}_${Date.now()}`
    const refreshToken = `refresh_${user.id}_${Date.now()}`

    // Update last login
    user.lastLogin = new Date()

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user

    const response = NextResponse.json({
      success: true,
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    })

    response.cookies.set("meesho_token", accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    response.cookies.set("meesho_user", JSON.stringify(userWithoutPassword), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
