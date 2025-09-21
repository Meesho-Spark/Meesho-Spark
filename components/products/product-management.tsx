"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Upload,
  Download,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  IndianRupee,
  Star,
} from "lucide-react"

const DUMMY_PRODUCTS = [
  {
    id: "P001",
    name: "Cotton Kurta Set - Traditional Ethnic Wear",
    category: "Women's Clothing",
    price: 1299,
    stock: 45,
    status: "active",
    rating: 4.2,
    reviews: 127,
    sales: 89,
    image: "/cotton-kurta.jpg",
    lastUpdated: "2 hours ago",
    views: 1247,
  },
  {
    id: "P002",
    name: "Wireless Bluetooth Earbuds - Premium Sound",
    category: "Electronics",
    price: 2499,
    stock: 12,
    status: "low_stock",
    rating: 4.5,
    reviews: 89,
    sales: 156,
    image: "/bluetooth-earbuds.jpg",
    lastUpdated: "1 day ago",
    views: 892,
  },
  {
    id: "P003",
    name: "Decorative Wall Art Canvas - Modern Abstract",
    category: "Home Decor",
    price: 899,
    stock: 0,
    status: "out_of_stock",
    rating: 4.0,
    reviews: 34,
    sales: 23,
    image: "/wall-art-canvas.jpg",
    lastUpdated: "3 days ago",
    views: 456,
  },
  {
    id: "P004",
    name: "Natural Face Serum - Anti-Aging Formula",
    category: "Beauty",
    price: 1799,
    stock: 78,
    status: "active",
    rating: 4.7,
    reviews: 203,
    sales: 267,
    image: "/face-serum.jpg",
    lastUpdated: "5 hours ago",
    views: 1834,
  },
  {
    id: "P005",
    name: "Gold Plated Necklace Set - Traditional Design",
    category: "Jewelry",
    price: 3299,
    stock: 23,
    status: "active",
    rating: 4.3,
    reviews: 67,
    sales: 45,
    image: "/gold-necklace.png",
    lastUpdated: "1 hour ago",
    views: 678,
  },
]

export function ProductManagement() {
  const [activeTab, setActiveTab] = useState("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "low_stock":
        return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
      case "out_of_stock":
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredProducts = DUMMY_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          </div>
          <p className="text-gray-600">Manage your product catalog, inventory, and performance</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">127</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +3 this week
                </p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Products</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="text-sm text-green-600">70% of total</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Alerts</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-yellow-600">Needs attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.3</p>
                <p className="text-sm text-green-600">+0.2 this month</p>
              </div>
              <Star className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">Product List</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Women's Clothing">Women's Clothing</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Home Decor">Home Decor</SelectItem>
                    <SelectItem value="Beauty">Beauty</SelectItem>
                    <SelectItem value="Jewelry">Jewelry</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="low_stock">Low Stock</SelectItem>
                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Product List */}
          <Card>
            <CardHeader>
              <CardTitle>Products ({filteredProducts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        {getStatusBadge(product.status)}
                      </div>
                      <p className="text-sm text-gray-600">
                        {product.category} • ID: {product.id}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <IndianRupee className="w-3 h-3" />
                          {product.price.toLocaleString()}
                        </span>
                        <span>Stock: {product.stock}</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {product.rating} ({product.reviews})
                        </span>
                        <span>{product.sales} sold</span>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm text-gray-500">Views: {product.views.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Updated {product.lastUpdated}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {DUMMY_PRODUCTS.slice(0, 3).map((product, index) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                        {index + 1}
                      </div>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sales} sales</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">₹{(product.price * product.sales).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Women's Clothing", "Electronics", "Beauty", "Jewelry", "Home Decor"].map((category, index) => (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{category}</span>
                        <span>{Math.floor(Math.random() * 50) + 10}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.floor(Math.random() * 80) + 20}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Operations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Bulk Upload</h3>
                  <p className="text-sm text-gray-600">Upload multiple products using CSV template</p>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                    <Button>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload CSV
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Bulk Actions</h3>
                  <p className="text-sm text-gray-600">Apply actions to multiple selected products</p>
                  <div className="flex gap-2">
                    <Button variant="outline">Update Prices</Button>
                    <Button variant="outline">Update Stock</Button>
                    <Button variant="outline">Change Status</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
