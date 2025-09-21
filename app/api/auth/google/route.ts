import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    // Redirect to Google OAuth
    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth")
    googleAuthUrl.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID || "demo_client_id")
    googleAuthUrl.searchParams.set(
      "redirect_uri",
      `${process.env.NEXTAUTH_URL || "http://localhost:3001"}/api/auth/google`,
    )
    googleAuthUrl.searchParams.set("response_type", "code")
    googleAuthUrl.searchParams.set("scope", "openid email profile")
    googleAuthUrl.searchParams.set("access_type", "offline")

    return NextResponse.redirect(googleAuthUrl.toString())
  }

  try {
    const googleUser = {
      id: "google_" + Date.now(),
      name: "Google User",
      email: "google.user@example.com",
    }

    const user = {
      id: googleUser.id,
      sellerId: `GS${googleUser.id.slice(-6)}`,
      sellerName: googleUser.name,
      email: googleUser.email,
      businessName: `${googleUser.name}'s Store`,
      phone: "",
      address: "",
      mTrustLevel: 1,
      mTrustScore: 50,
      createdAt: new Date(),
      lastLogin: new Date(),
    }

    const accessToken = `token_${user.id}_${Date.now()}`
    const refreshToken = `refresh_${user.id}_${Date.now()}`

    const response = NextResponse.redirect(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard`)

    response.cookies.set("meesho_token", accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    response.cookies.set("meesho_user", JSON.stringify(user), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    response.cookies.set("meesho_auth_success", "true", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60, // 1 minute - just for the redirect
    })

    return response
  } catch (error) {
    console.error("Google OAuth error:", error)
    const errorUrl = new URL("/", process.env.NEXTAUTH_URL || "http://localhost:3000")
    errorUrl.searchParams.set("error", "google_auth_failed")
    return NextResponse.redirect(errorUrl.toString())
  }
}
