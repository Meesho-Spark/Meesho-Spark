// MongoDB initialization script
db = db.getSiblingDB("meesho_spark")

// Create collections
db.createCollection("sellers")
db.createCollection("products")
db.createCollection("ai_processing")
db.createCollection("analytics")
db.createCollection("market_data")
db.createCollection("notifications")

// Create indexes
db.sellers.createIndex({ email: 1 }, { unique: true })
db.sellers.createIndex({ sellerId: 1 }, { unique: true })
db.products.createIndex({ sellerId: 1 })
db.products.createIndex({ category: 1 })
db.products.createIndex({ title: "text", description: "text", keywords: "text" })
db.ai_processing.createIndex({ sellerId: 1 })
db.ai_processing.createIndex({ createdAt: 1 })

// Insert sample data
db.sellers.insertOne({
  sellerId: "MS12345",
  sellerName: "Rajesh Sharma",
  email: "rajesh@example.com",
  businessName: "Sharma Textiles",
  phone: "+91-9876543210",
  address: "Mumbai, Maharashtra",
  mTrustLevel: 3,
  mTrustScore: 72,
  createdAt: new Date("2023-01-15"),
  lastLogin: new Date(),
})

db.products.insertMany([
  {
    sellerId: "MS12345",
    title: "Premium Cotton Kurta Set - Traditional Ethnic Wear",
    description: "Elegant and comfortable cotton kurta set perfect for festive occasions.",
    category: "Ethnic Wear",
    subcategory: "Kurta Sets",
    images: ["/cotton-kurta-after-enhanced.jpg"],
    originalImages: ["/cotton-kurta-before.jpg"],
    mrp: 1999,
    sellingPrice: 1299,
    discount: 35,
    totalStock: 50,
    availableStock: 45,
    isAIGenerated: true,
    views: 1250,
    orders: 45,
    conversionRate: 3.6,
    rating: 4.2,
    createdAt: new Date("2024-01-15"),
  },
])

print("Database initialized successfully!")
