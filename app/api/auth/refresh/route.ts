import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get("refreshToken")?.value || (await request.json()).refreshToken

    if (!refreshToken) {
      return NextResponse.json({ error: "Refresh token required" }, { status: 401 })
    }

    // Simple token validation (check if it starts with refresh_)
    if (!refreshToken.startsWith("refresh_")) {
      return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 })
    }

    // Extract user ID from token
    const userId = refreshToken.split("_")[1]

    // Generate new access token
    const newAccessToken = `token_${userId}_${Date.now()}`

    const response = NextResponse.json({
      success: true,
      accessToken: newAccessToken,
    })

    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
    })

    return response
  } catch (error) {
    console.error("Token refresh error:", error)
    return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 })
  }
}
