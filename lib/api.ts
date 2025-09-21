// API client for frontend
class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl

    // Get token from localStorage if available
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("accessToken") || this.getCookieValue("meesho_token")
    }
  }

  private getCookieValue(name: string): string | null {
    if (typeof window === "undefined") return null;
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Network error" }))
      throw new Error(error.error || "Request failed")
    }

    return response.json()
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    if (response.success) {
      this.setToken(response.accessToken)
      if (typeof window !== "undefined") {
        localStorage.setItem("refreshToken", response.refreshToken)
      }
    }

    return response
  }

  async register(sellerName: string, sellerId: string, email: string, password: string) {
    const response = await this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ sellerName, sellerId, email, password }),
    })

    if (response.success) {
      this.setToken(response.accessToken)
      if (typeof window !== "undefined") {
        localStorage.setItem("refreshToken", response.refreshToken)
      }
    }

    return response
  }

  // Dashboard methods
  async getDashboard() {
    return this.request("/seller/dashboard")
  }

  // Products methods
  async getProducts(params?: { page?: number; limit?: number; category?: string; search?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())
    if (params?.category) searchParams.set("category", params.category)
    if (params?.search) searchParams.set("search", params.search)

    const query = searchParams.toString()
    return this.request(`/products${query ? `?${query}` : ""}`)
  }

  async createProduct(productData: any) {
    return this.request("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    })
  }

  // AI methods
  async processImage(imageUrl: string) {
    return this.request("/ai/process", {
      method: "POST",
      body: JSON.stringify({ imageUrl }),
    })
  }

  // Analytics methods
  async getAnalytics() {
    return this.request("/analytics/dashboard")
  }

  // Operations methods
  async getStockAlerts(params?: { region?: string; status?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.region) searchParams.set("region", params.region)
    if (params?.status) searchParams.set("status", params.status)

    const query = searchParams.toString()
    return this.request(`/operations/stock-alerts${query ? `?${query}` : ""}`)
  }
}

export const apiClient = new ApiClient()
