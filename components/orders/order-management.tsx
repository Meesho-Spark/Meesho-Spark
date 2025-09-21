"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  Truck,
  Package,
  CheckCircle,
  Clock,
  IndianRupee,
  Calendar,
  MapPin,
  Phone,
  Download,
} from "lucide-react"

const DUMMY_ORDERS = [
  {
    id: "ORD001",
    customerName: "Priya Sharma",
    customerPhone: "+91 98765 43210",
    customerAddress: "123 MG Road, Bangalore, Karnataka 560001",
    products: [
      { name: "Cotton Kurta Set", quantity: 1, price: 1299 },
      { name: "Matching Dupatta", quantity: 1, price: 399 },
    ],
    total: 1698,
    status: "confirmed",
    paymentStatus: "paid",
    orderDate: "2024-01-15T10:30:00Z",
    expectedDelivery: "2024-01-20",
    trackingId: "TRK123456789",
  },
  {
    id: "ORD002",
    customerName: "Rajesh Kumar",
    customerPhone: "+91 87654 32109",
    customerAddress: "456 Park Street, Delhi, Delhi 110001",
    products: [{ name: "Wireless Bluetooth Earbuds", quantity: 2, price: 2499 }],
    total: 4998,
    status: "shipped",
    paymentStatus: "paid",
    orderDate: "2024-01-14T15:45:00Z",
    expectedDelivery: "2024-01-19",
    trackingId: "TRK987654321",
  },
  {
    id: "ORD003",
    customerName: "Anita Patel",
    customerPhone: "+91 76543 21098",
    customerAddress: "789 FC Road, Pune, Maharashtra 411005",
    products: [{ name: "Natural Face Serum", quantity: 1, price: 1799 }],
    total: 1799,
    status: "pending",
    paymentStatus: "pending",
    orderDate: "2024-01-16T09:15:00Z",
    expectedDelivery: "2024-01-22",
    trackingId: null,
  },
  {
    id: "ORD004",
    customerName: "Vikram Singh",
    customerPhone: "+91 65432 10987",
    customerAddress: "321 Mall Road, Shimla, Himachal Pradesh 171001",
    products: [{ name: "Gold Plated Necklace Set", quantity: 1, price: 3299 }],
    total: 3299,
    status: "delivered",
    paymentStatus: "paid",
    orderDate: "2024-01-10T14:20:00Z",
    expectedDelivery: "2024-01-15",
    trackingId: "TRK456789123",
  },
  {
    id: "ORD005",
    customerName: "Meera Reddy",
    customerPhone: "+91 54321 09876",
    customerAddress: "654 Tank Bund Road, Hyderabad, Telangana 500001",
    products: [{ name: "Decorative Wall Art Canvas", quantity: 2, price: 899 }],
    total: 1798,
    status: "cancelled",
    paymentStatus: "refunded",
    orderDate: "2024-01-12T11:30:00Z",
    expectedDelivery: null,
    trackingId: null,
  },
]

export function OrderManagement() {
  const [activeTab, setActiveTab] = useState("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "confirmed":
        return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>
      case "shipped":
        return <Badge className="bg-purple-100 text-purple-800">Shipped</Badge>
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "refunded":
        return <Badge className="bg-gray-100 text-gray-800">Refunded</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredOrders = DUMMY_ORDERS.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    const matchesPayment = selectedPaymentStatus === "all" || order.paymentStatus === selectedPaymentStatus
    return matchesSearch && matchesStatus && matchesPayment
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          </div>
          <p className="text-gray-600">Track and manage all your customer orders</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Orders
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="text-sm text-green-600">+8 this week</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-yellow-600">Needs attention</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Shipped Orders</p>
                <p className="text-2xl font-bold text-gray-900">34</p>
                <p className="text-sm text-blue-600">In transit</p>
              </div>
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹45,230</p>
                <p className="text-sm text-green-600">+12.5% this month</p>
              </div>
              <IndianRupee className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">Order List</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="fulfillment">Fulfillment</TabsTrigger>
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
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Order Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Payment Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Order List */}
          <Card>
            <CardHeader>
              <CardTitle>Orders ({filteredOrders.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                          {getStatusBadge(order.status)}
                          {getPaymentBadge(order.paymentStatus)}
                        </div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(order.orderDate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">₹{order.total.toLocaleString()}</p>
                        {order.trackingId && <p className="text-xs text-gray-500">Tracking: {order.trackingId}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Customer Details</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p className="font-medium">{order.customerName}</p>
                          <p className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {order.customerPhone}
                          </p>
                          <p className="flex items-start gap-1">
                            <MapPin className="w-3 h-3 mt-0.5" />
                            <span className="text-xs">{order.customerAddress}</span>
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Products</h4>
                        <div className="space-y-1">
                          {order.products.map((product, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {product.name} x{product.quantity}
                              </span>
                              <span>₹{(product.price * product.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                        {order.expectedDelivery && (
                          <p className="text-xs text-gray-500">
                            Expected delivery: {new Date(order.expectedDelivery).toLocaleDateString("en-IN")}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        {order.status === "confirmed" && (
                          <Button variant="outline" size="sm">
                            <Package className="w-4 h-4 mr-1" />
                            Mark as Shipped
                          </Button>
                        )}
                        {order.status === "shipped" && (
                          <Button variant="outline" size="sm">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Mark as Delivered
                          </Button>
                        )}
                      </div>
                      {order.trackingId && (
                        <Button variant="outline" size="sm">
                          <Truck className="w-4 h-4 mr-1" />
                          Track Order
                        </Button>
                      )}
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
                <CardTitle>Order Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { status: "Delivered", count: 43, color: "bg-green-500" },
                    { status: "Shipped", count: 34, color: "bg-blue-500" },
                    { status: "Confirmed", count: 8, color: "bg-purple-500" },
                    { status: "Pending", count: 4, color: "bg-yellow-500" },
                  ].map((item) => (
                    <div key={item.status} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="text-sm">{item.status}</span>
                      </div>
                      <span className="font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Order Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">This Week</span>
                    <span className="font-bold text-green-600">+8 orders</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Order Value</span>
                    <span className="font-bold">₹2,547</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fulfillment Rate</span>
                    <span className="font-bold text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customer Satisfaction</span>
                    <span className="font-bold text-green-600">4.3/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fulfillment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Fulfillment Center</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold">Pending Confirmation</h3>
                  <p className="text-2xl font-bold text-yellow-600">4</p>
                  <Button variant="outline" size="sm">
                    Review Orders
                  </Button>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Ready to Ship</h3>
                  <p className="text-2xl font-bold text-blue-600">8</p>
                  <Button variant="outline" size="sm">
                    Process Shipping
                  </Button>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Truck className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">In Transit</h3>
                  <p className="text-2xl font-bold text-purple-600">34</p>
                  <Button variant="outline" size="sm">
                    Track Shipments
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
