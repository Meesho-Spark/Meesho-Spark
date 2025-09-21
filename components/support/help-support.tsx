"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, MessageCircle, Phone, Mail, FileText, Search, Send, Clock, AlertCircle } from "lucide-react"

const FAQ_DATA = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I add my first product?",
        answer:
          "Go to Products > Add Product, fill in the details, upload images, and click Save. You can also use AI Spark to enhance your product listings automatically.",
      },
      {
        question: "How does AI Spark work?",
        answer:
          "AI Spark analyzes your product images, removes backgrounds, suggests appropriate backgrounds based on product category, and generates optimized titles, descriptions, and keywords.",
      },
      {
        question: "What payment methods are supported?",
        answer:
          "We support UPI, bank transfers, digital wallets, and all major credit/debit cards. Payments are processed securely through Meesho's payment gateway.",
      },
    ],
  },
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How do I process orders?",
        answer:
          "Orders appear in your Order Management section. Confirm orders, update inventory, generate shipping labels, and track deliveries all from one place.",
      },
      {
        question: "What are the shipping options?",
        answer:
          "Choose from Standard (5-7 days), Express (2-3 days), or Overnight delivery. Shipping rates vary by location and are calculated automatically.",
      },
      {
        question: "How do I handle returns?",
        answer:
          "Returns are managed through the Order Management system. You'll receive notifications for return requests and can approve/reject them based on your return policy.",
      },
    ],
  },
  {
    category: "Payments & Settlements",
    questions: [
      {
        question: "When do I receive payments?",
        answer:
          "Payments are settled based on your chosen cycle: Daily, Weekly, or Monthly. Funds are transferred directly to your registered bank account.",
      },
      {
        question: "Are there any transaction fees?",
        answer:
          "Meesho charges a small commission on each sale. The exact percentage depends on your product category and seller tier.",
      },
      {
        question: "How do I track my earnings?",
        answer:
          "Use the Intelligence Hub to view detailed revenue analytics, payment history, and settlement reports with downloadable statements.",
      },
    ],
  },
]

const SUPPORT_TICKETS = [
  {
    id: "TKT001",
    subject: "Payment settlement delay",
    status: "open",
    priority: "high",
    created: "2024-01-15T10:30:00Z",
    lastUpdate: "2024-01-16T14:20:00Z",
    category: "Payments",
  },
  {
    id: "TKT002",
    subject: "Product listing not visible",
    status: "in_progress",
    priority: "medium",
    created: "2024-01-14T09:15:00Z",
    lastUpdate: "2024-01-15T16:45:00Z",
    category: "Products",
  },
  {
    id: "TKT003",
    subject: "AI Spark enhancement issue",
    status: "resolved",
    priority: "low",
    created: "2024-01-12T11:20:00Z",
    lastUpdate: "2024-01-13T10:30:00Z",
    category: "AI Features",
  },
]

export function HelpSupport() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-red-100 text-red-800">Open</Badge>
      case "in_progress":
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-gray-100 text-gray-800">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const filteredFAQs = FAQ_DATA.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  })).filter((category) => category.questions.length > 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
          </div>
          <p className="text-gray-600">Get help, find answers, and contact our support team</p>
        </div>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 mb-4">Chat with our support team in real-time</p>
            <Button className="w-full bg-green-600 hover:bg-green-700">Start Chat</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-sm text-gray-600 mb-4">Call us at 1800-XXX-XXXX</p>
            <Button variant="outline" className="w-full bg-transparent">
              Call Now
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-gray-600 mb-4">Get help via email within 24 hours</p>
            <Button variant="outline" className="w-full bg-transparent">
              Send Email
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search frequently asked questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* FAQ Sections */}
          {filteredFAQs.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="tickets" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Support Tickets</h2>
            <Button>Create New Ticket</Button>
          </div>

          <div className="space-y-4">
            {SUPPORT_TICKETS.map((ticket) => (
              <Card key={ticket.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">#{ticket.id}</h3>
                        {getStatusBadge(ticket.status)}
                        {getPriorityBadge(ticket.priority)}
                      </div>
                      <p className="text-gray-900">{ticket.subject}</p>
                      <p className="text-sm text-gray-500">Category: {ticket.category}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Created: {new Date(ticket.created).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Last Update: {new Date(ticket.lastUpdate).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Getting Started Guide",
                description: "Complete guide to setting up your Meesho Spark account",
                icon: FileText,
                readTime: "5 min read",
              },
              {
                title: "AI Spark Tutorial",
                description: "Learn how to use AI Spark for product enhancement",
                icon: FileText,
                readTime: "8 min read",
              },
              {
                title: "Order Management",
                description: "Best practices for handling orders and customer service",
                icon: FileText,
                readTime: "6 min read",
              },
              {
                title: "Marketing Your Products",
                description: "Tips and strategies to increase your sales",
                icon: FileText,
                readTime: "10 min read",
              },
              {
                title: "Payment & Settlements",
                description: "Understanding payments, fees, and settlement cycles",
                icon: FileText,
                readTime: "4 min read",
              },
              {
                title: "Analytics & Reports",
                description: "Using Intelligence Hub for business insights",
                icon: FileText,
                readTime: "7 min read",
              },
            ].map((guide, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <guide.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{guide.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{guide.readTime}</span>
                    <Button variant="ghost" size="sm">
                      Read Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Support Ticket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm((prev) => ({ ...prev, subject: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="w-full p-2 border rounded-md"
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm((prev) => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="">Select Category</option>
                    <option value="products">Products</option>
                    <option value="orders">Orders</option>
                    <option value="payments">Payments</option>
                    <option value="ai-features">AI Features</option>
                    <option value="technical">Technical Issues</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  className="w-full p-2 border rounded-md"
                  value={ticketForm.priority}
                  onChange={(e) => setTicketForm((prev) => ({ ...prev, priority: e.target.value }))}
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide detailed information about your issue..."
                  rows={6}
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Submit Ticket
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
