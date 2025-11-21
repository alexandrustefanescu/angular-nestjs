# Backend - NestJS Todo API

A production-ready REST API built with NestJS, Fastify, and PostgreSQL using TypeORM. This backend provides a complete CRUD interface for managing todos with security best practices, comprehensive validation, and API documentation.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Setup](#database-setup)
- [Development](#development)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Architecture](#architecture)
- [Security](#security)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or 20+
- PostgreSQL 14+ or Docker
- pnpm 9+

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Start PostgreSQL (using Docker)
docker-compose up -d

# Run database migrations
pnpm exec typeorm migration:run

# Start development server
pnpm dev
```

The API will be available at `http://localhost:3001`

## 🛠️ Tech Stack

- **Framework:** NestJS 11 - Enterprise-grade Node.js framework
- **HTTP Server:** Fastify - High-performance HTTP framework
- **Database:** PostgreSQL 14+ - Robust relational database
- **ORM:** TypeORM - Elegant type-safe database ORM with decorators
- **Validation:** class-validator & class-transformer
- **API Docs:** Swagger/OpenAPI - Auto-generated documentation
- **Testing:** Vitest - Fast unit testing framework
- **Security:** Helmet + CSRF protection
- **Compiler:** SWC - Fast TypeScript/JavaScript compiler

## 📁 Project Structure

```
apps/backend/
   src/
      common/               # Shared utilities & filters
         filters/          # Exception filters
         decorators/       # Custom decorators
         config/           # Configuration files

      modules/              # Feature modules
         todos/            # Todos feature module
             todos.module.ts
             todos.service.ts
             todos.controller.ts
             dto/
                 create-todo.dto.ts
                 update-todo.dto.ts
             entities/
                 todo.entity.ts

      app.module.ts         # Root application module
      main.ts               # Application bootstrap

   test/                     # E2E tests
   database/                 # TypeORM database configuration
      migrations/           # Database migration history

   .env.example              # Environment variables template
   docker-compose.yml        # Docker services configuration
   package.json              # Dependencies & scripts
   eslint.config.mjs         # ESLint configuration
```

## 📚 API Documentation

### Interactive Swagger UI

Once the server is running, visit:
```
http://localhost:3001/v1/api
```

The API documentation includes all endpoints, request/response schemas, and allows you to test endpoints directly.

### API Base URL

All API endpoints are prefixed with:
```
http://localhost:3001/v1
```

### Endpoints

#### Get All Todos

```http
GET /todos
Authorization: Bearer {token}
X-CSRF-Token: {csrf-token}

Response: 200 OK
[
  {
    "id": 1,
    "title": "Learn NestJS",
    "description": "Master the NestJS framework",
    "isCompleted": false,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

#### Create Todo

```http
POST /todos
Content-Type: application/json
X-CSRF-Token: {csrf-token}

{
  "title": "Build a REST API",
  "description": "Create a production-ready API with NestJS"
}

Response: 201 Created
{
  "id": 2,
  "title": "Build a REST API",
  "description": "Create a production-ready API with NestJS",
  "isCompleted": false,
  "createdAt": "2024-01-15T11:00:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

#### Get Todo by ID

```http
GET /todos/:id
Authorization: Bearer {token}

Response: 200 OK
{
  "id": 1,
  "title": "Learn NestJS",
  ...
}
```

#### Update Todo

```http
PATCH /todos/:id
Content-Type: application/json
X-CSRF-Token: {csrf-token}

{
  "title": "Master NestJS",
  "isCompleted": true
}

Response: 200 OK
{
  "id": 1,
  "title": "Master NestJS",
  "description": "Master the NestJS framework",
  "isCompleted": true,
  ...
}
```

#### Delete Todo

```http
DELETE /todos/:id
X-CSRF-Token: {csrf-token}

Response: 200 OK
{
  "message": "Todo deleted successfully",
  "id": 1
}
```

## 🗄️ Database Setup

### Using Docker Compose

```bash
# Start PostgreSQL database
docker-compose up -d

# Stop PostgreSQL database
docker-compose down
```

### Configuration

Default connection details (from `docker-compose.yml`):
```
Host: localhost
Port: 5432
Database: backend_db
User: postgres
Password: postgres
```

### Initialize Database

```bash
# Run TypeORM migrations
pnpm exec typeorm migration:run

# Generate a new migration after entity/schema changes
pnpm exec typeorm migration:generate src/database/migrations/AddFeatureName

# Revert the last migration
pnpm exec typeorm migration:revert

# Synchronize database schema (development only)
pnpm exec typeorm schema:sync
```

### Database Schema

The Todo entity is defined using TypeORM decorators in `src/entities/todo.entity.ts`:

```typescript
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('boolean', { default: false })
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

## 🔧 Development

### Start Development Server

```bash
# Run with hot-reload (watches for file changes)
pnpm dev

# Run without watch mode
pnpm start

# Run production build
pnpm build && pnpm start:prod
```

The development server runs on `http://localhost:3001` with automatic reload on file changes.

### Available Scripts

```bash
# Development
pnpm dev              # Start with hot-reload
pnpm start            # Start application
pnpm build            # Build for production

# Linting & Formatting
pnpm lint             # Run ESLint with auto-fix
pnpm format           # Format code with Prettier

# Database
pnpm typeorm:migration:generate  # Generate a new migration
pnpm typeorm:migration:run        # Run all migrations
pnpm typeorm:migration:revert     # Revert the last migration

# Testing
pnpm test             # Run unit tests
pnpm test:watch       # Run tests in watch mode
pnpm test:cov         # Generate coverage report
pnpm test:e2e         # Run E2E tests
```

## ✅ Testing

### Test Framework

The project uses **Vitest** for fast, modern unit testing with TypeScript support:
- Unit tests run in isolation with mocked dependencies
- Type-safe mocking using `vi.spyOn()` and `vi.fn()`
- Comprehensive spec files alongside source code

### Unit Tests

Tests are located in `src/**/*.spec.ts` files alongside source code.

```bash
# Run all unit tests (single run)
pnpm test

# Run tests in watch mode (continuous)
pnpm test:watch

# Run specific test file
pnpm vitest run src/todos/todos.service.spec.ts

# Generate coverage report
pnpm test:cov
```

### Test Coverage

The backend includes comprehensive test coverage:
- **TodosService** (11 tests): CRUD operations, error handling
- **TodosController** (11 tests): HTTP endpoint validation, exception handling
- **E2E Tests**: API integration tests (currently skipped, requires database setup)

Run coverage:
```bash
pnpm test:cov
```

### E2E Tests

End-to-end tests are located in `test/` directory.

```bash
# Run E2E tests
pnpm test:e2e

# Run E2E tests in watch mode
pnpm test:e2e --watch
```

**Note:** E2E tests are currently marked as skipped (`describe.skip`) as they require a running PostgreSQL database. To enable them, configure database connection and remove the `.skip` modifier from `test/app.e2e-spec.ts`.

### Test Example

```typescript
describe('TodosService', () => {
  let service: TodosService;
  let repository: Repository<Todo>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: {
            create: vi.fn(),
            save: vi.fn(),
            find: vi.fn(),
            findOne: vi.fn(),
            remove: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    repository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('should create a todo', async () => {
    const createDto = { title: 'Test Todo' };
    const result = await service.create(createDto);
    expect(result.title).toBe('Test Todo');
  });
});
```

## 📊 Code Quality

### Linting & Formatting

The project uses **ESLint** and **Prettier** for code quality:

```bash
# Run ESLint with auto-fix
pnpm lint

# Format code with Prettier
pnpm format

# Check formatting without changes
pnpm format:check
```

### ESLint Configuration

Configuration is in `eslint.config.mjs`:
- **TypeScript-ESLint** for strict type checking
- **Prettier** integration for code formatting
- Custom rules for test files (relaxed unsafe-assignment rules)
- Recommended rules from TypeScript ESLint

Test files (`**/*.spec.ts`, `**/*.e2e-spec.ts`) have relaxed rules to allow mocking patterns while production code maintains strict standards.

### Type Safety

All TypeScript code is type-checked during compilation:
```bash
# Check types without compilation
pnpm exec tsc --noEmit
```

## 🏗️ Architecture

### Module Structure

The application uses NestJS modules for feature organization:

**TypeOrmModule** - Database ORM configuration
- Configured with TypeORM DataSource and entities
- Provides database connection and entity repositories
- Auto-loaded in app.module.ts

**TodosModule** - Todos feature
- `TodosController` - HTTP request handling
- `TodosService` - Business logic
- `Todo` Entity - TypeORM entity with decorators
- DTOs - Request/response validation

### Request Flow

```
HTTP Request
    ↓
Guard (Authentication)
    ↓
Controller (Route handling)
    ↓
Service (Business logic)
    ↓
TypeORM Repository (Database query)
    ↓
PostgreSQL Database
    ↓
Response
```

### Global Setup

The application configures:
- **Fastify Adapter** - High-performance HTTP server
- **Helmet Middleware** - Security headers
- **CSRF Protection** - Token-based protection
- **Global Validation Pipe** - DTO validation and transformation
- **Global Exception Filter** - Consistent error handling
- **Swagger/OpenAPI** - Auto-generated API documentation

## 🔒 Security

### CSRF Protection

All state-changing requests (POST, PATCH, DELETE) require a CSRF token:

```http
POST /todos
X-CSRF-Token: {csrf-token}
Content-Type: application/json
```

The CSRF token is automatically managed by the `@fastify/csrf-protection` middleware.

### Helmet Security Headers

Helmet middleware provides security headers:
- **Content Security Policy (CSP)** - Prevent XSS attacks
- **HSTS** - Force HTTPS connections
- **X-Frame-Options** - Prevent clickjacking
- **X-Content-Type-Options** - Prevent MIME type sniffing

### CORS Configuration

CORS is configured to allow only the frontend application:

```typescript
cors: {
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'X-CSRF-Token'],
}
```

### Input Validation

All requests are validated using class-validator decorators:

```typescript
export class CreateTodoDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
```

Invalid requests return a 400 Bad Request with detailed error messages.

### Environment Variables

Store sensitive data in `.env` file (never commit to repository):

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/backend_db

# Environment
NODE_ENV=development
PORT=3001

# Optional: API Keys, tokens, etc.
JWT_SECRET=your-secret-key
```

## 🛠️ Common Tasks

### Add a New Endpoint

1. Create a new TypeORM entity if needed: `src/entities/feature.entity.ts`
2. Update `app.module.ts` to include the new entity in TypeOrmModule
3. Generate migration: `pnpm exec typeorm migration:generate src/database/migrations/AddFeature`
4. Run migration: `pnpm exec typeorm migration:run`
5. Create DTO: `src/modules/todos/dto/new-feature.dto.ts`
6. Add method to `TodosService` using TypeORM repository
7. Add route to `TodosController`
8. Write tests in `*.spec.ts`

### Modify Database Schema

```bash
# Update entity decorators
vim src/entities/todo.entity.ts

# Generate migration (TypeORM creates the migration file automatically)
pnpm exec typeorm migration:generate src/database/migrations/DescribeChanges

# Run migration
pnpm exec typeorm migration:run

# Review and commit migration files
git add src/database/migrations/
git commit -m "feat: update database schema"
```

### Debug Database Issues

```bash
# Check TypeORM configuration
cat ormconfig.json or check app.module.ts

# Verify database connection
pnpm exec typeorm query:show

# Revert migrations if needed
pnpm exec typeorm migration:revert

# Synchronize schema (development only)
pnpm exec typeorm schema:sync
```

## 🚢 Deployment

### Production Build

```bash
# Build application
pnpm build

# Start production server
pnpm start:prod
```

### Environment Configuration

For production, update `.env`:

```env
DATABASE_URL=postgresql://user:password@prod-db:5432/database
NODE_ENV=production
PORT=3000
```

### Database Migrations

Always run migrations before deploying:

```bash
pnpm exec typeorm migration:run
```

## 👥 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run tests: `pnpm test`
4. Run linting: `pnpm lint`
5. Commit with clear messages
6. Submit a pull request

## 📖 Learn More

- [NestJS Documentation](https://docs.nestjs.com)
- [Fastify Documentation](https://www.fastify.io)
- [TypeORM Documentation](https://typeorm.io)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

## 📄 License

MIT
