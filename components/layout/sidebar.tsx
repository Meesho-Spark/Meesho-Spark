"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  BarChart3,
  TrendingUp,
  Brain,
  Package,
  ShoppingBag,
  Users,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Home,
  Zap,
  Shield,
  IndianRupee,
  Target,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  user?: any
}

export function Sidebar({ activeSection, onSectionChange, user }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const mainNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      badge: null,
    },
    {
      id: "ai-spark",
      label: "AI Spark",
      icon: Zap,
      badge: "NEW",
    },
  ]

  const hubNavItems = [
    {
      id: "operations",
      label: "Operations",
      icon: BarChart3,
      badge: "3",
      subItems: [
        { id: "stock-alerts", label: "Stock Alerts", icon: Package },
        { id: "cash-flow", label: "Cash Flow", icon: IndianRupee },
        { id: "protection", label: "Seller Protection", icon: Shield },
      ],
    },
    {
      id: "growth",
      label: "Growth",
      icon: TrendingUp,
      badge: null,
      subItems: [
        { id: "ai-stats", label: "AI Statistics", icon: Activity },
        { id: "mtrust", label: "M-Trust", icon: Shield },
        { id: "marketing", label: "Marketing Tools", icon: Target },
      ],
    },
    {
      id: "intelligence",
      label: "Intelligence",
      icon: Brain,
      badge: null,
      subItems: [
        { id: "trending", label: "Trending Products", icon: TrendingUp },
        { id: "demographics", label: "Customer Demographics", icon: Users },
        { id: "opportunities", label: "Market Opportunities", icon: Target },
      ],
    },
  ]

  const bottomNavItems = [
    {
      id: "products",
      label: "Products",
      icon: Package,
      badge: "127",
    },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingBag,
      badge: "89",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      badge: null,
    },
    {
      id: "help",
      label: "Help & Support",
      icon: HelpCircle,
      badge: null,
    },
  ]

  const NavItem = ({ item, isSubItem = false }: { item: any; isSubItem?: boolean }) => (
    <Button
      variant={activeSection === item.id ? "default" : "ghost"}
      className={cn(
        "w-full justify-start gap-3 h-10",
        isSubItem && "ml-6 h-8 text-sm",
        collapsed && !isSubItem && "justify-center px-2",
        activeSection === item.id && "bg-purple-600 text-white hover:bg-purple-700",
      )}
      onClick={() => onSectionChange(item.id)}
    >
      <item.icon className={cn("w-4 h-4", collapsed && !isSubItem && "w-5 h-5")} />
      {!collapsed && (
        <>
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge && (
            <Badge variant="secondary" className="text-xs">
              {item.badge}
            </Badge>
          )}
        </>
      )}
    </Button>
  )

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-amber-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-bold text-gray-900">Meesho Spark</h2>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Main Navigation */}
        <div className="space-y-2">
          {!collapsed && <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Main</p>}
          {mainNavItems.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>

        {/* Hubs */}
        <div className="space-y-4">
          {!collapsed && <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Hubs</p>}
          {hubNavItems.map((hub) => (
            <div key={hub.id} className="space-y-1">
              <NavItem item={hub} />
              {!collapsed && hub.subItems && (
                <div className="space-y-1">
                  {hub.subItems.map((subItem) => (
                    <NavItem key={subItem.id} item={subItem} isSubItem />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="space-y-2">
          {!collapsed && <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Management</p>}
          {bottomNavItems.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
