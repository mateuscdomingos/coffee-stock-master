# Coffee Stock Master

A robust, enterprise-grade supply chain and inventory management system designed for coffee shop chains. This project serves as a showcase of high-level Frontend Engineering, applying **Clean Architecture**, **Domain-Driven Design (DDD)**, and **SOLID** principles.

## The Problem

Coffee shop owners often struggle with manual inventory tracking, leading to waste or stockouts. Managers need a fail-safe way to request supplies while respecting monthly budgets and stock levels. This application provides a controlled environment for supply orchestration.

## Architecture & Patterns

This project is built to be independent of external frameworks or UI libraries. The core business logic is encapsulated in a pure domain layer, ensuring the system is easy to test and maintain.

- **Clean Architecture:** Strict separation of concerns between Domain, Application, Infra, and UI layers.
- **Domain-Driven Design (DDD):** Modeling business rules through Entities, Value Objects, and Domain Services.
- **Immutability:** State management focused on predictable data flow, avoiding side effects in business rules.
- **State Machine:** Order lifecycle managed through explicit status transitions.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 15+ (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Styling:** [Material UI (MUI)](https://mui.com/) & [Tailwind CSS](https://tailwindcss.com/)
- **Testing:** [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/)
- **CI/CD:** GitHub Actions (Validating Lint, Build, and Unit Tests on every PR)

## 📂 Project Structure

```text
src/
  ├── core/                # Pure business logic (Framework agnostic)
  │   ├── domain/          # Entities, Value Objects, and Domain Rules
  │   ├── application/     # Use Cases (Orchestration & Business flows)
  │   └── interfaces/      # Repository and Gateway contracts (Abstractions)
  ├── infra/               # Implementations of external concerns
  │   ├── repositories/    # Database/API implementations (e.g., Vercel Postgres)
  │   └── adapters/        # Data mappers and formatters
  └── ui/                  # Framework-specific layer (Next.js/MUI)
      ├── components/      # React components (Atomic Design or Feature-based)
      ├── hooks/           # UI-related custom hooks
      └── app/             # Routing, Page layouts, and Server Components
```

## ⚙️ Development

### Prerequisites

- Node.js (v20 or higher)
- pnpm (`npm install -g pnpm`)

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/coffee-stock-master.git](https://github.com/YOUR_USERNAME/coffee-stock-master.git)
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Run unit tests:**
   ```bash
   pnpm test
   ```
4. **Start the development server:**
   ```bash
   pnpm dev
   ```

## Conventional Commits

This project follows the Conventional Commits specification for a clear and organized commit history. Examples:

- `feat: add budget validation logic to Order entity`
- `fix: correct stock deduction calculation`
- `test: add unit tests for order approval use case`
- `docs: update readme with architectural patterns`
- `chore: configure github actions pipeline`
