export interface User {
  id: string
  sellerId: string
  sellerName: string
  email: string
  businessName?: string
  phone?: string
  address?: string
  mTrustLevel: number
  mTrustScore: number
  createdAt: Date
  lastLogin: Date
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export const verifyToken = (token: string): any => {
  // Simple token validation for v0 compatibility
  if (!token || !token.startsWith("token_")) {
    throw new Error("Invalid or expired token")
  }

  const parts = token.split("_")
  if (parts.length !== 3) {
    throw new Error("Invalid token format")
  }

  return {
    userId: parts[1],
    timestamp: parts[2],
  }
}

export const generateTokens = (user: User): AuthTokens => {
  const accessToken = `token_${user.id}_${Date.now()}`
  const refreshToken = `refresh_${user.id}_${Date.now()}`

  return { accessToken, refreshToken }
}
