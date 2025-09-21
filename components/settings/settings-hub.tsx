"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, User, Building, Bell, CreditCard, Truck, Save, Upload } from "lucide-react"

export function SettingsHub() {
  const [profileData, setProfileData] = useState({
    sellerName: "Rajesh Kumar",
    sellerId: "SELLER123456",
    email: "rajesh@example.com",
    phone: "+91 98765 43210",
    businessName: "Kumar Fashion Store",
    gstNumber: "27ABCDE1234F1Z5",
    panNumber: "ABCDE1234F",
    address: "123 MG Road, Bangalore, Karnataka 560001",
    description: "Premium ethnic wear and fashion accessories for modern Indian families.",
  })

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    stockAlerts: true,
    paymentNotifications: true,
    marketingEmails: false,
    smsNotifications: true,
    weeklyReports: true,
  })

  const [paymentSettings, setPaymentSettings] = useState({
    bankName: "State Bank of India",
    accountNumber: "1234567890",
    ifscCode: "SBIN0001234",
    upiId: "rajesh@paytm",
    settlementCycle: "daily",
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-500 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          </div>
          <p className="text-gray-600">Manage your account, business, and platform preferences</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  <p className="text-sm text-gray-500">JPG, PNG up to 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sellerName">Full Name</Label>
                  <Input
                    id="sellerName"
                    value={profileData.sellerName}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, sellerName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sellerId">Seller ID</Label>
                  <Input id="sellerId" value={profileData.sellerId} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, address: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Business Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={profileData.businessName}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, businessName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input
                    id="gstNumber"
                    value={profileData.gstNumber}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, gstNumber: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="panNumber">PAN Number</Label>
                  <Input
                    id="panNumber"
                    value={profileData.panNumber}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, panNumber: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select defaultValue="individual">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="company">Private Limited Company</SelectItem>
                      <SelectItem value="llp">Limited Liability Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  value={profileData.description}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  placeholder="Describe your business and products..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">
                        {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      </p>
                      <p className="text-sm text-gray-500">
                        {key === "orderUpdates" && "Get notified about new orders and status changes"}
                        {key === "stockAlerts" && "Receive alerts when products are running low on stock"}
                        {key === "paymentNotifications" && "Notifications about payments and settlements"}
                        {key === "marketingEmails" && "Promotional emails and platform updates"}
                        {key === "smsNotifications" && "SMS alerts for critical updates"}
                        {key === "weeklyReports" && "Weekly performance and analytics reports"}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [key]: checked }))}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    value={paymentSettings.bankName}
                    onChange={(e) => setPaymentSettings((prev) => ({ ...prev, bankName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={paymentSettings.accountNumber}
                    onChange={(e) => setPaymentSettings((prev) => ({ ...prev, accountNumber: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input
                    id="ifscCode"
                    value={paymentSettings.ifscCode}
                    onChange={(e) => setPaymentSettings((prev) => ({ ...prev, ifscCode: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    value={paymentSettings.upiId}
                    onChange={(e) => setPaymentSettings((prev) => ({ ...prev, upiId: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="settlementCycle">Settlement Cycle</Label>
                <Select
                  value={paymentSettings.settlementCycle}
                  onValueChange={(value) => setPaymentSettings((prev) => ({ ...prev, settlementCycle: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Shipping Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultShipping">Default Shipping Method</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Delivery (5-7 days)</SelectItem>
                      <SelectItem value="express">Express Delivery (2-3 days)</SelectItem>
                      <SelectItem value="overnight">Overnight Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="processingTime">Processing Time (days)</Label>
                  <Select defaultValue="1-2">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="same-day">Same Day</SelectItem>
                      <SelectItem value="1-2">1-2 Days</SelectItem>
                      <SelectItem value="3-5">3-5 Days</SelectItem>
                      <SelectItem value="5-7">5-7 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Shipping Zones</h3>
                <div className="space-y-3">
                  {[
                    { zone: "Local (Same City)", rate: "₹40", time: "1-2 days" },
                    { zone: "Regional (Same State)", rate: "₹60", time: "2-4 days" },
                    { zone: "National", rate: "₹80", time: "4-7 days" },
                    { zone: "Remote Areas", rate: "₹120", time: "7-10 days" },
                  ].map((zone) => (
                    <div key={zone.zone} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{zone.zone}</p>
                        <p className="text-sm text-gray-500">{zone.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{zone.rate}</p>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
