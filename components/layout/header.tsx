"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, ChevronDown, Settings, LogOut, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  activeSection: string
  user?: any
  onLogout?: () => void
}

export function Header({ activeSection, user, onLogout }: HeaderProps) {
  const getSectionTitle = (section: string) => {
    const titles: Record<string, string> = {
      dashboard: "Dashboard",
      "ai-spark": "AI Spark",
      operations: "Operations Hub",
      growth: "Growth Hub",
      intelligence: "Intelligence Hub",
      products: "Product Management",
      orders: "Order Management",
      settings: "Settings",
      help: "Help & Support",
    }
    return titles[section] || "Dashboard"
  }

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-gray-900">{getSectionTitle(activeSection)}</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search products, orders, insights..." className="pl-10 w-80" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="space-y-1">
                  <p className="font-medium text-sm">Stock Alert</p>
                  <p className="text-xs text-gray-500">Denim Jacket is running low (5 left)</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="space-y-1">
                  <p className="font-medium text-sm">New Order</p>
                  <p className="text-xs text-gray-500">Cotton Kurta Set - ₹899</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="space-y-1">
                  <p className="font-medium text-sm">AI Processing Complete</p>
                  <p className="text-xs text-gray-500">Silk Saree listing is ready</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 px-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>{user ? getUserInitials(user.sellerName) : "U"}</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-medium text-sm">{user?.sellerName || "User"}</p>
                  <p className="text-xs text-gray-500">{user?.sellerId || "ID"}</p>
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
