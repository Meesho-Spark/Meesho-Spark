"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  Zap,
  ImageIcon,
  Sparkles,
  Download,
  Copy,
  Check,
  RefreshCw,
  Eye,
  Smartphone,
  Monitor,
  ArrowRight,
  Star,
  Palette,
  Wand2,
} from "lucide-react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"

interface ProcessingStep {
  id: string
  label: string
  status: "pending" | "processing" | "completed" | "error"
}

const PRODUCT_CATEGORIES = {
  fashion: {
    name: "Fashion & Clothing",
    backgrounds: [
      "Studio gradient (Neutral)",
      "Lifestyle setting (Model wearing)",
      "Clean white studio",
      "Soft pastel gradient",
      "Minimalist backdrop",
    ],
  },
  electronics: {
    name: "Electronics & Gadgets",
    backgrounds: [
      "Modern tech desk",
      "Clean geometric background",
      "Futuristic gradient",
      "Professional workspace",
      "Minimalist tech surface",
    ],
  },
  home: {
    name: "Home & Decor",
    backgrounds: [
      "Complementary room setting",
      "Neutral surface texture",
      "Cozy home environment",
      "Modern interior backdrop",
      "Natural lighting setup",
    ],
  },
  beauty: {
    name: "Beauty & Cosmetics",
    backgrounds: [
      "Elegant marble texture",
      "Soft lighting gradient",
      "Premium silk backdrop",
      "Luxury spa setting",
      "Rose gold accent background",
    ],
  },
  jewelry: {
    name: "Jewelry & Accessories",
    backgrounds: [
      "Luxury velvet texture",
      "Dramatic lighting setup",
      "Premium silk backdrop",
      "Elegant gradient",
      "High-end jewelry display",
    ],
  },
}

export function AISparkMain() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null)
  const [backgroundEnhancedImage, setBackgroundEnhancedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedBackground, setSelectedBackground] = useState<string>("")
  const [generatedContent, setGeneratedContent] = useState({
    title: "",
    description: "",
    keywords: "",
    category: "",
    price: "",
  })
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">("mobile")
  const [copied, setCopied] = useState<string | null>(null)

  const processingSteps: ProcessingStep[] = [
    { id: "upload", label: "Image Upload", status: "completed" },
    { id: "analysis", label: "AI Product Analysis", status: "pending" },
    { id: "category", label: "Category Detection", status: "pending" },
    { id: "enhancement", label: "Background Removal", status: "pending" },
    { id: "background", label: "Smart Background Generation", status: "pending" },
    { id: "content", label: "Content Generation", status: "pending" },
    { id: "optimization", label: "SEO Optimization", status: "pending" },
  ]

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setUploadedImage(reader.result as string)
        setEnhancedImage(null)
        setBackgroundEnhancedImage(null)
        setSelectedCategory("")
        setSelectedBackground("")
        setGeneratedContent({
          title: "",
          description: "",
          keywords: "",
          category: "",
          price: "",
        })
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const processImage = async () => {
    if (!uploadedImage) return

    setIsProcessing(true)
    setProcessingProgress(0)
    setCurrentStep(1)

    // Simulate AI processing steps with more detailed progression
    const steps = [
      { progress: 15, step: 1, delay: 1000 }, // AI Analysis
      { progress: 30, step: 2, delay: 1500 }, // Category Detection
      { progress: 50, step: 3, delay: 2000 }, // Background Removal
      { progress: 70, step: 4, delay: 2500 }, // Background Generation
      { progress: 85, step: 5, delay: 1500 }, // Content Generation
      { progress: 100, step: 6, delay: 1000 }, // SEO Optimization
    ]

    for (const { progress, step, delay } of steps) {
      await new Promise((resolve) => setTimeout(resolve, delay))
      setProcessingProgress(progress)
      setCurrentStep(step)

      // Auto-detect category at step 2
      if (step === 2) {
        const categories = Object.keys(PRODUCT_CATEGORIES)
        const detectedCategory = categories[Math.floor(Math.random() * categories.length)]
        setSelectedCategory(detectedCategory)
      }
    }

    // Simulate enhanced image (in real app, this would come from AI service)
    setEnhancedImage("/enhanced-product.png")
    setBackgroundEnhancedImage("/enhanced-product.png")

    // Auto-select first background option for detected category
    if (selectedCategory) {
      const categoryData = PRODUCT_CATEGORIES[selectedCategory as keyof typeof PRODUCT_CATEGORIES]
      setSelectedBackground(categoryData.backgrounds[0])
      setBackgroundEnhancedImage("/enhanced-product.png") // In real app, this would be the background-enhanced version
    }

    const contentVariations = {
      fashion: {
      
        title: "Elegant Lavender Purple Ceramic Coffee Mug",
        description: "Enjoy your favorite beverage in style with this elegant lavender-purple ceramic coffee mug. Crafted from high-quality, durable ceramic, it features a smooth texture and a subtle, sophisticated sheen. Its minimalist design and calming color make it a perfect addition to any modern kitchen or office space. Ideal for coffee, tea, or hot chocolate, this mug combines functionality with a touch of modern elegance.",
        keywords: "ceramic coffee mug, lavender mug, purple cup, minimalist drinkware, modern kitchenware, tea cup, gift for coffee lover, office mug",
        category: "Kitchen & Drinkware",
        price: "₹449"
      
  },
      electronics: {
        title: "Wireless Bluetooth Earbuds - Premium Sound Quality",
        description:
          "High-quality wireless earbuds with crystal clear sound, noise cancellation, and long battery life. Perfect for music, calls, and workouts. Comes with charging case and multiple ear tip sizes for comfortable fit.",
        keywords: "wireless earbuds, bluetooth headphones, noise cancellation, premium audio, wireless charging",
        category: "Electronics & Accessories",
        price: "₹2,499",
      },
      home: {
        title: "Decorative Wall Art Canvas - Modern Abstract Design",
        description:
          "Beautiful modern abstract wall art perfect for living room, bedroom, or office decoration. High-quality canvas print with vibrant colors and contemporary design. Ready to hang with included mounting hardware.",
        keywords: "wall art, canvas print, home decor, abstract art, modern design, interior decoration",
        category: "Home & Garden",
        price: "₹899",
      },
      beauty: {
        title: "Natural Face Serum - Anti-Aging & Hydrating Formula",
        description:
          "Premium anti-aging face serum with natural ingredients for deep hydration and skin rejuvenation. Reduces fine lines, improves skin texture, and provides lasting moisture. Suitable for all skin types.",
        keywords: "face serum, anti-aging, natural skincare, hydrating serum, beauty products, skin care",
        category: "Beauty & Personal Care",
        price: "₹1,799",
      },
      jewelry: {
        title: "Gold Plated Necklace Set - Traditional Indian Jewelry",
        description:
          "Exquisite gold plated necklace set with matching earrings. Features traditional Indian design with intricate patterns and premium finish. Perfect for weddings, festivals, and special occasions.",
        keywords: "gold plated jewelry, necklace set, traditional jewelry, Indian jewelry, wedding jewelry",
        category: "Jewelry & Accessories",
        price: "₹3,299",
      },
    }

    const content = contentVariations[selectedCategory as keyof typeof contentVariations] || contentVariations.fashion
    setGeneratedContent(content)

    setIsProcessing(false)
  }

  const regenerateBackground = async () => {
    if (!selectedCategory || !selectedBackground) return

    setIsProcessing(true)
    setProcessingProgress(0)

    // Simulate background regeneration
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setProcessingProgress(100)

    // In real app, this would generate a new background
    setBackgroundEnhancedImage("/enhanced-product.png")
    setIsProcessing(false)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const regenerateContent = () => {
    // Simulate regeneration with different content
    const alternatives = [
      {
        title: "Stylish Cotton Kurta with Dupatta - Festive Collection",
        description:
          "Beautiful handcrafted cotton kurta set featuring traditional patterns and modern comfort. Perfect blend of style and tradition with premium quality fabric and detailed craftsmanship.",
      },
      {
        title: "Designer Ethnic Kurta Set - Premium Quality Cotton",
        description:
          "Exquisite cotton kurta set with elegant embroidery and comfortable fit. Ideal for special occasions, festivals, and cultural celebrations. Comes with matching accessories.",
      },
    ]

    const random = alternatives[Math.floor(Math.random() * alternatives.length)]
    setGeneratedContent((prev) => ({
      ...prev,
      title: random.title,
      description: random.description,
    }))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-amber-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">AI Spark</h1>
            <Badge className="bg-purple-100 text-purple-700">Beta</Badge>
          </div>
          <p className="text-gray-600">
            Transform your product images with AI-powered enhancement & intelligent backgrounds
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">This month</p>
            <p className="text-2xl font-bold text-purple-600">1,247</p>
            <p className="text-sm text-gray-500">products enhanced</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Upload & Processing */}
        <div className="space-y-6">
          {/* Upload Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Product Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                  isDragActive ? "border-purple-500 bg-purple-50" : "border-gray-300 hover:border-purple-400",
                )}
              >
                <input {...getInputProps()} />
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded product"
                      className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                    />
                    <p className="text-sm text-gray-600">Image uploaded successfully!</p>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Different Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        {isDragActive ? "Drop your image here" : "Drag & drop your product image"}
                      </p>
                      <p className="text-sm text-gray-500">or click to browse files</p>
                    </div>
                    <p className="text-xs text-gray-400">Supports JPEG, PNG, WebP up to 10MB</p>
                  </div>
                )}
              </div>

              {uploadedImage && !isProcessing && !enhancedImage && (
                <div className="mt-6">
                  <Button onClick={processImage} className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Enhance with AI
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {selectedCategory && !isProcessing && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Smart Background Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Detected Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PRODUCT_CATEGORIES).map(([key, category]) => (
                        <SelectItem key={key} value={key}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCategory && (
                  <div className="space-y-2">
                    <Label>Background Style</Label>
                    <Select value={selectedBackground} onValueChange={setSelectedBackground}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose background style" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRODUCT_CATEGORIES[selectedCategory as keyof typeof PRODUCT_CATEGORIES].backgrounds.map(
                          (bg) => (
                            <SelectItem key={bg} value={bg}>
                              {bg}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedBackground && (
                  <Button onClick={regenerateBackground} variant="outline" className="w-full bg-transparent">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate New Background
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Processing Status */}
          {isProcessing && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  AI Processing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing your image...</span>
                    <span>{processingProgress}%</span>
                  </div>
                  <Progress value={processingProgress} className="h-2" />
                </div>
                <div className="space-y-2">
                  {processingSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                          index < currentStep
                            ? "bg-green-500 text-white"
                            : index === currentStep
                              ? "bg-purple-500 text-white"
                              : "bg-gray-200 text-gray-500",
                        )}
                      >
                        {index < currentStep ? <Check className="w-3 h-3" /> : index + 1}
                      </div>
                      <span
                        className={cn("text-sm", index <= currentStep ? "text-gray-900 font-medium" : "text-gray-500")}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {enhancedImage && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Enhancement Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600">Original</p>
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Original"
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600">Background Removed</p>
                      <img
                        src={enhancedImage || "/placeholder.svg"}
                        alt="Enhanced"
                        className="w-full h-32 object-cover rounded-lg border shadow-md"
                      />
                    </div>
                  </div>

                  {backgroundEnhancedImage && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600">With Smart Background</p>
                      <img
                        src={backgroundEnhancedImage || "/placeholder.svg"}
                        alt="Background Enhanced"
                        className="w-full h-48 object-cover rounded-lg border shadow-lg"
                      />
                      <p className="text-xs text-gray-500">Background: {selectedBackground}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Generated Content & Preview */}
        <div className="space-y-6">
          {/* Generated Content */}
          {generatedContent.title && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    AI Generated Content
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={regenerateContent}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="title">Product Title</Label>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(generatedContent.title, "title")}>
                      {copied === "title" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <Input
                    id="title"
                    value={generatedContent.title}
                    onChange={(e) => setGeneratedContent((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="description">Description</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generatedContent.description, "description")}
                    >
                      {copied === "description" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <Textarea
                    id="description"
                    value={generatedContent.description}
                    onChange={(e) => setGeneratedContent((prev) => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={generatedContent.category}
                      onChange={(e) => setGeneratedContent((prev) => ({ ...prev, category: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Suggested Price</Label>
                    <Input
                      id="price"
                      value={generatedContent.price}
                      onChange={(e) => setGeneratedContent((prev) => ({ ...prev, price: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="keywords">SEO Keywords</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generatedContent.keywords, "keywords")}
                    >
                      {copied === "keywords" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <Input
                    id="keywords"
                    value={generatedContent.keywords}
                    onChange={(e) => setGeneratedContent((prev) => ({ ...prev, keywords: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Meesho Preview */}
          {(backgroundEnhancedImage || enhancedImage) && generatedContent.title && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Meesho Listing Preview</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={previewMode === "mobile" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("mobile")}
                    >
                      <Smartphone className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={previewMode === "desktop" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("desktop")}
                    >
                      <Monitor className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={cn(
                    "border rounded-lg p-4 bg-white",
                    previewMode === "mobile" ? "max-w-sm mx-auto" : "w-full",
                  )}
                >
                  <div className="space-y-3">
                    <img
                      src={backgroundEnhancedImage || enhancedImage || "/placeholder.svg"}
                      alt="Product preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm line-clamp-2">{generatedContent.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-600">{generatedContent.price}</span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{Number.parseInt(generatedContent.price.replace("₹", "").replace(",", "")) + 500}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          35% OFF
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">(4.2) • 127 reviews</span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">{generatedContent.description}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {(backgroundEnhancedImage || enhancedImage) && generatedContent.title && (
            <div className="flex gap-4">
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                <ArrowRight className="w-4 h-4 mr-2" />
                Publish to Meesho
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Assets
              </Button>
            </div>
          )}
        </div>
      </div>

      {(backgroundEnhancedImage || enhancedImage) && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">AI Enhancement Complete!</h3>
                <p className="text-gray-600">
                  Your product is ready for listing with optimized content and intelligent background.
                </p>
              </div>
              <div className="flex items-center gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">+67%</p>
                  <p className="text-sm text-gray-500">Click-through Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">+45%</p>
                  <p className="text-sm text-gray-500">Conversion Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">+52%</p>
                  <p className="text-sm text-gray-500">Revenue Increase</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
