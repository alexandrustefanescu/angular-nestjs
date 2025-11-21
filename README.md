# Turbo Mono - Full-Stack Todo Management Application

A modern, production-ready monorepo showcasing a complete full-stack Todo Management application with **Angular 21** frontend, **NestJS** backend, and **PostgreSQL** database.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Available Commands](#available-commands)
- [Architecture](#architecture)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Database Setup](#database-setup)
- [Security](#security)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or 20+
- pnpm 9+
- Docker & Docker Compose (for PostgreSQL)

### Installation

```bash
# Install dependencies
pnpm install

# Start PostgreSQL database
docker-compose up -d

# Run all applications in development mode
pnpm dev
```

Once started, access:
- **Frontend:** http://localhost:4200
- **Backend API:** http://localhost:3001
- **API Documentation:** http://localhost:3001/v1/api

## 📁 Project Structure

```
turbo-mono/
   apps/
      frontend/          # Angular 21 SSR web application
         src/
             app/pages/    # Page components
             app/services/ # API services
             app/components/ # Reusable components
             main.ts      # Client bootstrap

      backend/           # NestJS REST API
          src/
              modules/    # Feature modules
              common/     # Shared utilities
              main.ts     # App bootstrap
          test/           # E2E tests
          prisma/         # Database schema & migrations

   packages/
      types/             # Shared TypeScript types & DTOs
      typescript-config/ # Shared TypeScript configuration

   turbo.json            # Turborepo configuration
   pnpm-workspace.yaml   # pnpm workspace setup
   package.json          # Root package configuration
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** Angular 21 (Standalone Components)
- **Styling:** Tailwind CSS 4 + SCSS + Angular Material
- **SSR:** Angular Universal with Express
- **Testing:** Vitest + Playwright
- **HTTP:** RxJS-based HTTP client with type safety

### Backend
- **Framework:** NestJS 11
- **HTTP Server:** Fastify
- **Database:** PostgreSQL with TypeORM
- **Validation:** class-validator & class-transformer
- **API Docs:** Swagger/OpenAPI
- **Testing:** Vitest + E2E tests

### Shared
- **Package Manager:** pnpm with workspaces
- **Build System:** Turborepo
- **Type Safety:** TypeScript 5.7+
- **Code Quality:** ESLint, Prettier
- **Security:** Helmet, CSRF protection

## 📦 Available Commands

### Root Level

```bash
# Development - Run all apps with hot reload
pnpm dev

# Build all applications
pnpm build

# Lint entire workspace
pnpm lint

# Format code
pnpm format
```

### Frontend (apps/frontend)

```bash
cd apps/frontend

# Development server
pnpm dev

# Production build
pnpm build

# Serve SSR build
pnpm serve:ssr:frontend

# Run tests (single run)
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run E2E tests
pnpm test:e2e
```

### Backend (apps/backend)

```bash
cd apps/backend

# Development server with watch
pnpm dev

# Production build
pnpm build

# Run application
pnpm start

# Run unit tests (single run)
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run E2E tests
pnpm test:e2e

# Lint with auto-fix
pnpm lint
```

## 🏗️ Architecture

### Frontend Architecture

The frontend is built with Angular 21's latest patterns:
- **Standalone Components:** All components are standalone, removing the need for NgModules
- **Server-Side Rendering:** Angular Universal provides SSR for better performance and SEO
- **Services:** Reactive TodosService communicates with backend API
- **Routing:** Simple routing from `/todos` (main) and `/creator` (create new)
- **Styling:** Tailwind CSS utilities with custom theme

### Backend Architecture

The backend follows NestJS best practices:
- **Modular Structure:** Feature-based modules (Todos, Prisma)
- **Fastify:** High-performance HTTP server with security middleware
- **TypeORM:** Type-safe database ORM
- **DTOs:** Request/response validation using class-validator
- **Swagger:** Auto-generated API documentation
- **Global Pipes:** Automatic validation and transformation

### Communication Flow

```
Frontend (Angular)
    ↓ HTTP Request
    ↓ Backend (NestJS)
        ↓ TypeORM ORM
            ↓ PostgreSQL Database
```

All requests include CSRF tokens and credentials for security.

## ✅ Testing

### Test Configuration

Tests are configured to run once by default for CI/CD pipelines. Use the `:watch` variants for continuous testing during development.

### Frontend Tests

```bash
cd apps/frontend

# Run unit tests (single run)
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run E2E tests with Playwright
pnpm test:e2e

# Run tests with coverage
pnpm test:coverage
```

### Backend Tests

```bash
cd apps/backend

# Run unit tests (single run)
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run E2E API tests
pnpm test:e2e

# Generate coverage report
pnpm test:cov
```

### Test Coverage

**Backend:**
- **TodosService:** 11 tests (CRUD operations, error handling)
- **TodosController:** 11 tests (HTTP endpoint validation, exception handling)
- **E2E Tests:** API integration tests (currently skipped, requires database setup)

**Frontend:**
- Component tests using Vitest and Playwright
- End-to-end tests with Playwright

## 📊 Code Quality

### Linting & Formatting

```bash
# Lint entire workspace with auto-fix
pnpm lint

# Format code with Prettier
pnpm format
```

### ESLint & Prettier Configuration

- **ESLint** with TypeScript-ESLint for strict type checking
- **Prettier** for consistent code formatting
- Custom rules per context:
  - **Test files** (`**/*.spec.ts`, `**/*.e2e-spec.ts`): Relaxed rules for mocking patterns
  - **Production code**: Strict type-checking and safety standards
- Type safety checks: `pnpm exec tsc --noEmit`

### Code Standards

- No unsafe type assignments in production code
- Type-safe mocking in tests using Vitest
- Consistent formatting enforced by Prettier
- Both frontend and backend follow same ESLint config standards

## 🗄️ Database Setup

### Start PostgreSQL

```bash
# Using Docker Compose
docker-compose up -d

# Connection details:
# Host: localhost
# Port: 5432
# Database: backend_db
# User: postgres
# Password: postgres
```

### Initialize Database

```bash
cd apps/backend

# Generate Prisma Client
pnpm exec prisma generate

# Run migrations
pnpm exec prisma migrate dev

# View database in Prisma Studio
pnpm exec prisma studio
```

### Database Schema

```prisma
model Todo {
  id          Int     @id @default(autoincrement())
  title       String
  description String?
  isCompleted Boolean @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🔒 Security Features

### CSRF Protection
- Token-based CSRF protection via @fastify/csrf-protection
- Automatic token validation on state-changing requests
- Angular client handles XSRF token management

### Helmet Security Headers
- Content Security Policy (CSP)
- XSS Protection
- HSTS (HTTP Strict Transport Security)
- Clickjacking protection

### CORS Configuration
- Restricted to frontend origin (`http://localhost:4200`)
- Credentials allowed for session management
- Specific methods and headers whitelisted

### Input Validation
- Class-validator for DTO validation
- Automatic request transformation
- Type safety via TypeScript

## 📚 Shared Types

Located in `packages/types/src/index.ts`:

```typescript
// Shared across frontend and backend
export interface Todo {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateTodoDto {
  title: string;
  description?: string;
  isCompleted?: boolean;
}

export class UpdateTodoDto {
  title?: string;
  description?: string;
  isCompleted?: boolean;
}
```

## 🔌 API Reference

### Base URL
```
http://localhost:3001/v1
```

### Endpoints

#### Get All Todos
```http
GET /todos
Response: Todo[]
```

#### Create Todo
```http
POST /todos
Content-Type: application/json

{
  "title": "Learn Angular 21",
  "description": "Master standalone components"
}
Response: Todo
```

#### Update Todo
```http
PATCH /todos/:id
Content-Type: application/json

{
  "isCompleted": true
}
Response: Todo
```

#### Delete Todo
```http
DELETE /todos/:id
Response: { message: "Todo deleted successfully" }
```

## 🌍 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/backend_db
NODE_ENV=development
PORT=3001
```

### Frontend
Configuration is handled via `environment.ts` files:
```typescript
// Backend API URL
API_URL = 'http://localhost:3001/v1'
```

## 👥 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run tests: `pnpm test` (or `pnpm test:watch` for development)
4. Run linting: `pnpm lint`
5. Format code: `pnpm format`
6. Submit a pull request

## 📖 Learn More

- [Angular Documentation](https://angular.io)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeORM Documentation](https://typeorm.io)
- [Turborepo Documentation](https://turbo.build/repo/docs)

## 📄 License

MIT
