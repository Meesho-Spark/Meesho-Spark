"""
Meesho Spark AI Processing Service
FastAPI service for AI-powered image enhancement and content generation
"""

from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import google.generativeai as genai
from PIL import Image
import io
import base64
import os
import time
import json
from typing import Optional, Dict, Any
import uvicorn

# Initialize FastAPI app
app = FastAPI(
    title="Meesho Spark AI Service",
    description="AI-powered image enhancement and content generation for Meesho sellers",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini AI
GEMINI_API_KEY = "AIzaSyCqFcFaxFrHz1z0NOhdR71FDDZcn66VfFs"
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

# AI Processing Prompts
BACKGROUND_REMOVAL_PROMPT = """
BACKGROUND REMOVAL ONLY - ZERO PRODUCT MODIFICATION:

STRICT REQUIREMENTS:
1. Remove background completely while preserving product 100%
2. Keep exact colors, patterns, textures, fabric details unchanged
3. Maintain original product pose, angle, positioning
4. Place on pure white (#FFFFFF) background only
5. Keep product edges clean and natural
6. Preserve any text, logos, designs on product
7. Do NOT enhance, brighten, adjust product in any way
8. Do NOT add shadows, effects, or lighting changes

FORBIDDEN ACTIONS:
- Color correction on product
- Lighting enhancement on product
- Texture modifications
- Pattern alterations
- Adding effects or shadows

OUTPUT: Clean product on white background with zero product alterations
"""

CONTENT_GENERATION_PROMPT = """
Generate e-commerce product content for Indian market (Meesho platform):

Based on the product image, create:
1. SEO-optimized title (50-60 characters)
2. Compelling description (100-150 words)
3. Relevant keywords for Indian market
4. Category classification
5. Pricing suggestion based on visual analysis

Focus on:
- Indian fashion terminology
- Festival and occasion relevance
- Regional preferences
- Competitive pricing for Indian market
- SEO keywords that Indian customers search for

Format response as JSON with keys: title, description, keywords, category, suggested_price
"""

class AIProcessor:
    def __init__(self):
        self.processing_stats = {
            "total_processed": 0,
            "success_rate": 0.94,
            "avg_processing_time": 2.8
        }
    
    async def enhance_image(self, image_data: bytes) -> Dict[str, Any]:
        """
        Process image with AI for background removal and enhancement
        """
        start_time = time.time()
        
        try:
            # Convert bytes to PIL Image
            image = Image.open(io.BytesIO(image_data))
            
            # Convert to base64 for API
            buffered = io.BytesIO()
            image.save(buffered, format="JPEG")
            img_base64 = base64.b64encode(buffered.getvalue()).decode()
            
            # In a real implementation, this would call the actual AI service
            # For demo purposes, we'll simulate the processing
            await self._simulate_processing()
            
            # Mock enhanced image (in real app, this would be the AI result)
            enhanced_image_data = img_base64  # Placeholder
            
            processing_time = time.time() - start_time
            
            # Update stats
            self.processing_stats["total_processed"] += 1
            self.processing_stats["avg_processing_time"] = (
                self.processing_stats["avg_processing_time"] + processing_time
            ) / 2
            
            return {
                "enhanced_image": enhanced_image_data,
                "processing_time": processing_time,
                "confidence": 0.94,
                "status": "success"
            }
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Image processing failed: {str(e)}")
    
    async def generate_content(self, image_data: bytes) -> Dict[str, Any]:
        """
        Generate product content using AI
        """
        try:
            # Convert bytes to PIL Image
            image = Image.open(io.BytesIO(image_data))
            
            # In real implementation, this would use Gemini Vision API
            # For demo, we'll return mock content
            await self._simulate_processing()
            
            # Mock generated content
            content = {
                "title": "Premium Cotton Kurta Set - Traditional Ethnic Wear",
                "description": "Elegant and comfortable cotton kurta set perfect for festive occasions. Features intricate embroidery work, premium quality fabric, and traditional design. Available in multiple sizes with matching dupatta. Ideal for festivals, parties, and cultural events.",
                "keywords": "cotton kurta, ethnic wear, traditional dress, festival wear, embroidered kurta, Indian clothing",
                "category": "Women's Ethnic Wear",
                "suggested_price": "₹1,299"
            }
            
            return content
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Content generation failed: {str(e)}")
    
    async def _simulate_processing(self):
        """Simulate AI processing delay"""
        import asyncio
        await asyncio.sleep(2)  # Simulate 2 second processing time

# Initialize AI processor
ai_processor = AIProcessor()

@app.get("/")
async def root():
    return {
        "service": "Meesho Spark AI Service",
        "version": "1.0.0",
        "status": "running",
        "stats": ai_processor.processing_stats
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "stats": ai_processor.processing_stats
    }

@app.post("/process-image")
async def process_image(file: UploadFile = File(...)):
    """
    Process uploaded image with AI enhancement and content generation
    """
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    if file.size > 10 * 1024 * 1024:  # 10MB limit
        raise HTTPException(status_code=400, detail="File size must be less than 10MB")
    
    try:
        # Read image data
        image_data = await file.read()
        
        # Process image enhancement
        enhancement_result = await ai_processor.enhance_image(image_data)
        
        # Generate content
        content_result = await ai_processor.generate_content(image_data)
        
        return JSONResponse({
            "success": True,
            "data": {
                "processing_id": f"proc_{int(time.time())}",
                "original_filename": file.filename,
                "enhanced_image": enhancement_result["enhanced_image"],
                "generated_content": content_result,
                "processing_time": enhancement_result["processing_time"],
                "confidence": enhancement_result["confidence"],
                "status": "completed"
            }
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/enhance-image")
async def enhance_image_only(file: UploadFile = File(...)):
    """
    Enhance image only (background removal)
    """
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        image_data = await file.read()
        result = await ai_processor.enhance_image(image_data)
        
        return JSONResponse({
            "success": True,
            "data": result
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate-content")
async def generate_content_only(file: UploadFile = File(...)):
    """
    Generate content only (no image enhancement)
    """
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        image_data = await file.read()
        result = await ai_processor.generate_content(image_data)
        
        return JSONResponse({
            "success": True,
            "data": result
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/stats")
async def get_processing_stats():
    """
    Get AI processing statistics
    """
    return {
        "success": True,
        "data": ai_processor.processing_stats
    }

if __name__ == "__main__":
    print("Starting Meesho Spark AI Service...")
    print("Service will be available at: http://localhost:8000")
    print("API Documentation: http://localhost:8000/docs")
    
    uvicorn.run(
        "ai_service:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
