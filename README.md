# Boilerplate Theme

An **enterprise-ready Next.js 15** boilerplate with **complete infrastructure** for production applications. Features **shadcn/ui**, **Tailwind CSS 4**, **TypeScript**, **dark mode**, custom hooks, API client, validation schemas, and more. Built for developers who want to start building features immediately.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)

---

## ✨ Features

### Core Stack
- ⚡ **Next.js 15** with App Router & Turbopack
- ⚛️ **React 19** with latest features
- 📘 **TypeScript** for type safety
- 🎨 **Tailwind CSS 4** for styling
- 🧩 **shadcn/ui** with 25+ pre-installed components
- 🔷 **Lucide Icons** for consistent iconography

### Production Ready
- 🌓 **Dark Mode** with next-themes (light/dark/system)
- 🎯 **Custom OKLCH Color System** with semantic tokens
- 🛡️ **Error Boundaries** (error.tsx, global-error.tsx, not-found.tsx)
- ⚡ **Loading States** with skeleton components
- 🔒 **Security Headers** configured in next.config.ts
- 📝 **Form Validation** with React Hook Form + Zod
- 🔔 **Toast Notifications** with Sonner
- 📱 **Fully Responsive** mobile-first design

### Enterprise Infrastructure ⭐ NEW
- 🎣 **Custom Hooks** (media queries, localStorage, debouncing, API fetching)
- 🌐 **API Client** with error handling, retry logic, and type safety
- ✅ **Validation Schemas** (Zod patterns for auth, forms, common inputs)
- 🏷️ **TypeScript Types** (shared types, data models, API responses)
- 🛠️ **Organized Utilities** (formatters, validators, helpers)
- ⚙️ **Configuration** (typed environment variables, app constants)
- 📊 **Shared Components** (data table, file upload, reusable patterns)
- 📁 **Clean Structure** with route groups and organized folders

### Developer Experience
- 🎨 **Component Showcase** page with all UI components
- 📋 **Registration Example** with form validation & data table
- 📚 **Comprehensive Documentation** in claude.md (step-by-step guides)
- 🗂️ **Enterprise Structure** optimized for scalability
- 🔧 **Environment Variables** with type-safe validation
- 🎭 **Reusable Patterns** throughout the codebase
- 📖 **Non-Technical Friendly** documentation for Claude Code users

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/boilerplate_theme.git
   cd boilerplate_theme
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
boilerplate_theme/
├── app/
│   ├── (examples)/              # 🗑️ Example content (delete when starting new project)
│   │   └── register/            # Registration form + table example
│   ├── api/
│   │   └── example/
│   │       └── route.ts         # API route handler example
│   ├── layout.tsx               # Root layout with ThemeProvider
│   ├── page.tsx                 # Component showcase
│   ├── loading.tsx              # Root loading state
│   ├── error.tsx                # Error boundary
│   ├── global-error.tsx         # Root error handler
│   ├── not-found.tsx            # 404 page
│   └── globals.css              # Theme tokens & global styles
│
├── components/
│   ├── ui/                      # shadcn components (25+)
│   ├── shared/                  # Custom reusable components
│   │   ├── data-table.tsx       # Generic table with sorting/pagination
│   │   ├── file-upload.tsx      # File upload with preview/validation
│   │   ├── icon-badge.tsx       # Icon wrapper component
│   │   └── theme-toggle.tsx     # Dark mode toggle
│   ├── layouts/                 # Layout components
│   │   ├── app-layout.tsx
│   │   ├── header.tsx
│   │   └── footer.tsx
│   └── providers/               # Context providers
│       └── theme-provider.tsx
│
├── hooks/                       # Custom React hooks
│   ├── use-media-query.ts       # Responsive breakpoints
│   ├── use-local-storage.ts     # Browser storage with SSR safety
│   ├── use-debounce.ts          # Input debouncing
│   └── use-api.ts               # API fetching with states
│
├── lib/
│   ├── api/                     # API client infrastructure
│   │   ├── client.ts            # Fetch wrapper with error handling
│   │   ├── endpoints.ts         # API URL constants
│   │   └── types.ts             # API response types
│   ├── validations/             # Zod schemas
│   │   ├── auth.ts              # Auth validation schemas
│   │   ├── common.ts            # Reusable validators
│   │   └── index.ts
│   ├── types/                   # Shared TypeScript types
│   │   ├── index.ts             # Common types
│   │   └── models.ts            # Data model patterns
│   ├── utils/                   # Organized utilities
│   │   ├── cn.ts                # Tailwind class merger
│   │   ├── formatters.ts        # Data formatting functions
│   │   ├── validators.ts        # Runtime validators
│   │   └── index.ts
│   ├── constants.ts             # App-wide constants
│   └── env.ts                   # Typed environment variables
│
├── public/
│   ├── images/                  # Image assets
│   └── icons/                   # Icon assets
│
├── .env.example                 # Environment variables template
├── .vscode/                     # VS Code settings & extensions
├── .prettierrc                  # Code formatting config
└── components.json              # shadcn configuration
```

---

## 🎨 Color System

Custom OKLCH color tokens with full dark mode support:

- **Primary**: Ink blue (`#2D3E50`)
- **Secondary**: Warm beige (`#E6E2DA`)
- **Muted**: Light gray neutrals
- **Destructive**: Error red
- **Full dark mode variants** for all colors

Edit colors in `app/globals.css` under `:root` and `.dark` selectors.

---

## 🧩 Available Components

**25+ shadcn/ui components installed:**
- Forms: Button, Input, Textarea, Checkbox, Radio, Select, Switch, Slider, Label
- Layout: Card, Separator, Tabs, Table, Accordion
- Feedback: Alert, Dialog, Popover, Tooltip, Toast (Sonner), Skeleton
- Display: Badge, Avatar, Alert Dialog, Dropdown Menu

**Add more components:**
```bash
npx shadcn@latest add <component-name>
```

---

## 📋 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🎯 Use as Boilerplate

### For New Projects

1. **Copy this directory** to your project location
2. **Update package.json** - change name, version, description
3. **Delete example content** - Remove `app/(examples)` folder
4. **Replace landing page** - Modify `app/page.tsx` with your content
5. **Update metadata** in `app/layout.tsx` (author, URLs)
6. **Configure environment** - Copy `.env.example` to `.env.local` and add your values
7. **Start building** - Use existing infrastructure and patterns

### What to Keep ✅
- **All infrastructure folders:** `/hooks`, `/lib`, `/components`, `/public`
- **Error handling:** `app/error.tsx`, `app/global-error.tsx`, `app/not-found.tsx`
- **Layout system:** `app/layout.tsx`, `app/globals.css`, `components/layouts/`
- **Theme system:** `components/providers/theme-provider.tsx`, dark mode support
- **Configuration:** `.env.example`, `.vscode/`, `.prettierrc`, `eslint.config.mjs`

### What to Delete 🗑️
- **`app/(examples)` folder** - Example registration page (study it first!)
- **`app/page.tsx` content** - Replace with your landing page

### What to Customize 🔄
- **`app/page.tsx`** - Your home page content
- **`app/layout.tsx`** - Update metadata (title, description, author)
- **`app/globals.css`** - Customize theme colors for your brand
- **`lib/constants.ts`** - Update app-wide settings
- **`lib/env.ts`** - Add your environment variables
- **`lib/api/endpoints.ts`** - Define your API endpoints
- **`README.md`** - Project-specific documentation

### Quick Start Guide

See [claude.md](./claude.md) for comprehensive step-by-step instructions on:
- Starting a new project from this boilerplate
- Using with Claude Code
- Adding new features and components
- Best practices and patterns

---

## 📚 Documentation & Examples

### Main Documentation
See [claude.md](./claude.md) for comprehensive documentation including:
- **Starting a New Project** - Step-by-step guide for non-technical users
- **Component Patterns** - How to use and extend components
- **Code Organization** - Where to put different types of code
- **Using with Claude Code** - Tips and best practices
- **Common Tasks** - Ready-to-use examples

### Live Examples
- **Component Showcase**: http://localhost:3000 - All UI components demo
- **Registration Example**: http://localhost:3000/register - Form validation & data tables

### Infrastructure Examples
- **Custom Hooks**: See `/hooks` folder for media queries, localStorage, debouncing, API fetching
- **API Client**: See `/lib/api` for fetch wrapper and endpoint management
- **Validation**: See `/lib/validations` for Zod schema patterns
- **Utilities**: See `/lib/utils` for formatters and validators
- **Shared Components**: See `/components/shared` for reusable patterns

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| Framework | Next.js 15.5.4 | App Router, Server Components, Turbopack |
| UI Library | React 19.1.0 | Latest React features |
| Language | TypeScript 5 | Type safety throughout |
| Styling | Tailwind CSS 4 | Utility-first CSS |
| Components | shadcn/ui | 25+ pre-built components |
| Icons | Lucide React | 1000+ consistent icons |
| Forms | React Hook Form + Zod | Form handling & validation |
| Toasts | Sonner | Toast notifications |
| Theme | next-themes | Dark mode support |
| Animations | tw-animate-css | CSS animations |
| Code Quality | ESLint + Prettier | Linting & formatting |

### Enterprise Infrastructure Added
- **Custom Hooks** - Reusable React patterns
- **API Client** - Type-safe HTTP communication
- **Validation Library** - Zod schema patterns
- **Type System** - Shared TypeScript types
- **Utility Library** - Formatters, validators, helpers
- **Configuration** - Environment variables, constants

---

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)

---

## 📄 License

MIT License - feel free to use this boilerplate for any project.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 🎉 What Makes This Different

This isn't just another Next.js starter. This boilerplate includes:

✅ **Complete Infrastructure** - Not just UI components, but hooks, API client, validation, types, and utilities
✅ **Enterprise Ready** - Patterns and structure that scale from prototype to production
✅ **Developer Friendly** - Comprehensive documentation written for non-technical users
✅ **Time Saving** - Start building features immediately instead of setting up infrastructure
✅ **Best Practices** - Error handling, loading states, dark mode, security headers, code quality
✅ **Real Examples** - Working registration form with validation and data tables
✅ **Type Safe** - TypeScript throughout with typed environment variables
✅ **Battle Tested** - Production patterns used in real applications

---

**Built with ❤️ using Next.js and shadcn/ui**
**Enterprise infrastructure added for production-ready applications**
