# Content Subscription App

## Overview

This is a **Next.js API** designed for content subscription. The system allows users to subscribe to categories and receive weekly digest emails with recommended content. It also integrates with external APIs to fetch content daily and store it in the database.

## Features

- **User Subscription**: Users can subscribe to different content categories.
- **Content Fetching**: A cron job fetches content daily from an external API (DummyJSON) and stores it.
- **Weekly Digest**: An automated email system sends a weekly digest of content to subscribed users.
- **Payment Integration**: Stripe integration for handling subscription payments.
- **Email Notifications**: Uses **Nodemailer** with SMTP for email notifications.
- **Validation**: Zod is used for request payload validation.
- **Database**: Prisma ORM with PostgreSQL.
- **Singleton Architecture**: All services, repositories, and clients are managed via a container to ensure singleton behavior.

## Technologies Used

- **Next.js** - React framework for building APIs and SSR applications.
- **Prisma ORM** - Database management and migrations.
- **PostgreSQL** - Relational database.
- **Zod** - Request payload validation.
- **Nodemailer** - SMTP email service.
- **Stripe** - Payment gateway integration.
- **Crontab** - Scheduling tasks for content fetching and email notifications.
- **SOLID Principles** - Ensuring clean and maintainable code.

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18+)
- **PostgreSQL** (Latest version)
- **Docker** (Optional for running PostgreSQL in a container)

### Steps to Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git content_subscription
   cd content_subscription
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables (use test.env as a template):
4. Run database migrations:
   ```sh
   npx prisma migrate dev
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure

```
src/
│── cron/            # Scheduled tasks (content fetching, digest emails)
│── dtos/            # Data Transfer Objects for request validation
│── interfaces/      # Interfaces for types and structure
│── middleware/      # Middleware functions
│── pages/api/       # Next.js API endpoints
│── repositories/    # Database interaction (Prisma repositories)
│── services/        # Business logic and service layer
│── strategies/      # Strategy pattern implementation (Payment & Email)
│── styles/          # Frontend styles (if applicable)
│── utils/           # Utility functions
│── test.env             # Environment variables
```

## Running Cron Jobs

To manually trigger the **content fetching** cron job:

```sh
npx ts-node src/cron/fetchContent.ts
```

To manually trigger the **weekly digest email** cron job:

```sh
npx ts-node src/cron/sendWeeklyDigest.ts
```



## Error Handling

- **Global Error Middleware**: Next.js API routes include error-handling middleware to catch common issues.
- **Unhandled Rejections & Exceptions**: Wrapped in `try-catch` blocks in async functions where necessary.
- **Custom API Error Responses**: Uses a standardized response format `{ success: false, message: 'Error details' }`.


