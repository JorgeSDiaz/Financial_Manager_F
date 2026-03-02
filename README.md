# Financial Manager

Personal finance tracking desktop application with income, expense categorization and reporting.

## Requirements

- **Frontend**: Node.js 18+, Bun
- **Backend**: Go 1.21+
- **Desktop**: Rust (for Tauri)

## Tech Stack

| Component | Technology |
|-----------|------------|
| Desktop App | Tauri |
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| State/Data | TanStack Query |
| Backend API | Go + SQLite |

## Project Structure

```
.
├── Financial-Manager_B/     # Backend (Go + SQLite)
├── Financial-Manager_F/     # Frontend (Tauri + React)
├── src-tauri/              # Tauri Rust backend
└── src/                    # React frontend
    ├── domain/              # Entities, interfaces
    ├── infrastructure/      # API client
    └── presentation/       # UI components, pages
```

## Getting Started

### Frontend

```bash
# Install dependencies
bun install

# Run in development mode
bun tauri dev

# Build for production
bun tauri build
```

### Backend (required for production)

The frontend connects to the backend API at `http://localhost:8080`.

See [Financial-Manager_B](../Financial-Manager_B/) for backend setup.

## Available Commands

| Command | Description |
|---------|-------------|
| `bun tauri dev` | Run app in development mode |
| `bun tauri build` | Build production executable |
| `bun tauri build --debug` | Build with debug symbols |

## API Endpoints

The frontend consumes the following API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/dashboard` | Dashboard summary |
| GET | `/api/v1/accounts` | List accounts |
| POST | `/api/v1/accounts` | Create account |
| GET | `/api/v1/categories` | List categories |
| POST | `/api/v1/categories` | Create category |
| GET | `/api/v1/transactions/incomes` | List income transactions |
| GET | `/api/v1/transactions/expenses` | List expense transactions |
| POST | `/api/v1/transactions/incomes` | Create income |
| POST | `/api/v1/transactions/expenses` | Create expense |
| GET | `/api/v1/export/csv` | Export to CSV |
| GET | `/api/v1/export/json` | Export to JSON |

## Architecture

The frontend follows Clean Architecture principles:

```mermaid
graph TD
    UI[UI Layer - Presentation]
    App[Application Layer]
    Domain[Domain Layer]
    Infra[Infrastructure Layer]
    Backend[External Backend]
    DB[(Database)]

    UI --> App
    App --> Domain
    App --> Infra
    Infra --> Backend
    Backend --> DB
```

### Layer Dependencies

```mermaid
graph LR
    subgraph Presentation
        Pages[Pages]
        Components[Components]
        Hooks[Hooks]
    end
    
    subgraph Application
        UseCases[Use Cases]
        DTO[DTOs]
    end
    
    subgraph Domain
        Entities[Entities]
        Interfaces[Interfaces]
    end
    
    subgraph Infrastructure
        Client[HTTP Client]
    end
    
    Pages --> UseCases
    Components --> UseCases
    Hooks --> UseCases
    UseCases --> Entities
    UseCases --> Interfaces
    Client --> Interfaces
```

### Component Overview

```mermaid
graph TB
    subgraph Pages
        Dashboard[Dashboard]
        Transactions[Transactions]
        Accounts[Accounts]
        Categories[Categories]
        Export[Export]
    end
    
    subgraph Components
        UI[UI primitives]
        Forms[Forms]
        Lists[Lists]
    end
    
    subgraph Providers
        Query[State Management]
        Router[Router]
    end
    
    Dashboard --> UI
    Transactions --> Forms
    Transactions --> Lists
    Accounts --> Forms
    Accounts --> Lists
    Categories --> Forms
    Categories --> Lists
    Export --> UI
    
    Query --> Client
    Router --> Pages
```

### Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Page
    participant Hook
    participant Query
    participant Client
    participant Backend
    
    User->>Page: Interact
    Page->>Hook: Call useCase
    Hook->>Query: useQuery/mutation
    Query->>Client: HTTP Request
    Client->>Backend: REST API
    Backend->>Backend: Process
    Backend-->>Client: JSON Response
    Client-->>Query: Data
    Query-->>Hook: Data
    Hook-->>Page: Update state
    Page-->>User: Render
```

### Project Structure

```
src/
├── domain/           # Business entities and interfaces
│   ├── entities/     # Transaction, Account, Category
│   └── repositories/# Interface definitions
├── application/     # Use cases (future)
├── infrastructure/  # External services
│   └── api/         # HTTP client
└── presentation/    # UI layer
    ├── components/  # Reusable UI components
    ├── pages/      # Screen components
    ├── hooks/      # Custom hooks
    └── providers/  # Context providers
```

## License

[GPL-3.0](./LICENSE)
