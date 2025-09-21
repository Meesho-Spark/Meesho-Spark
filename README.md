# Meesho Spark

**Meesho Spark** is a comprehensive, AI-driven dashboard designed to empower Meesho sellers. It provides a suite of powerful tools to enhance product listings, gain market intelligence, streamline operations, and accelerate business growth.

## Key Features

*   **AI Spark:** Automatically enhance product listings using AI. Generate compelling titles, descriptions, and prices. Process and improve product images for better customer engagement.
*   **Intelligence Hub:** Uncover market trends, analyze competitor performance, and get demand forecasts. Identify new product and geographic opportunities to stay ahead of the curve.
*   **Growth Hub:** Track your business growth with detailed analytics on AI-enhanced products. Manage ad credits and monitor social media content performance.
*   **Operations Hub:** Get real-time stock alerts to prevent stockouts. Monitor your cash flow with income and expense tracking. Manage protection claims for fraud and returns.
*   **Reports & Analytics:** Generate and download a variety of detailed reports, including sales summaries, regional performance, and customer demographics.
*   **Product & Order Management:** A centralized system to manage your product catalog and track all customer orders from placement to delivery.
*   **Authentication:** Secure sign-up and sign-in with email/password and Google OAuth.
*   **Help & Support:** An integrated support center with FAQs, helpful guides, and a support ticket system.

## Tech Stack

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn/ui, Radix UI
*   **Data Visualization:** Recharts
*   **Icons:** Lucide React
*   **AI Backend:** Python, Docker
*   **Database:** MongoDB
*   **Authentication:** JWT, Google OAuth

## Getting Started

### Prerequisites

*   Node.js (v18 or later)
*   npm
*   Docker and Docker Compose

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd meesho-spark
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a .env.local file in the root of the project and add the following variables. You will need to get `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from the Google Cloud Console.

    ```env
    # Backend
    JWT_SECRET=your_jwt_secret
    JWT_REFRESH_SECRET=your_jwt_refresh_secret

    # Google OAuth
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    NEXTAUTH_URL=http://localhost:3000
    ```

4.  **Start backend services:**
    Run the MongoDB database and the Python AI service using Docker Compose.
    ```bash
    docker-compose -f ./scripts/docker-compose.yml up -d
    ```

5.  **Run the development server:**
    ```bash
    npm start
    ```

The application will be available at `http://localhost:3000`.
