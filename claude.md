# Boilerplate Theme - Next.js Project

A production-ready boilerplate using **Next.js 15**, **React 19**, **shadcn/ui**, **Tailwind CSS 4**, **Lucide icons**, and **dark mode support** with error boundaries, loading states, and security headers.

---

## 🚀 Quick Start

### Development Server
```bash
$ npm run dev
```
Visit: http://localhost:3000

### Build for Production
```bash
$ npm run build
$ npm start
```

### Lint Code
```bash
$ npm run lint
```

---

## 📁 Project Structure

```
boilerplate_theme/
├── app/
│   ├── (examples)/              # 🗑️ DELETE when starting new project
│   │   └── register/            # Example: Registration form + table
│   ├── api/
│   │   └── example/
│   │       └── route.ts         # Example API route handler
│   ├── layout.tsx               # ✅ KEEP - Root layout with ThemeProvider
│   ├── page.tsx                 # 🔄 REPLACE - Component showcase (replace with your landing page)
│   ├── loading.tsx              # ✅ KEEP - Root loading state
│   ├── error.tsx                # ✅ KEEP - Error boundary
│   ├── global-error.tsx         # ✅ KEEP - Root-level error handler
│   ├── not-found.tsx            # ✅ KEEP - Custom 404 page
│   └── globals.css              # ✅ KEEP - Theme tokens (light + dark mode)
├── components/
│   ├── ui/                      # ✅ KEEP - shadcn components (25+ installed)
│   ├── shared/                  # ✅ KEEP - Custom reusable components
│   │   ├── icon-badge.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── data-table.tsx       # Generic table component
│   │   └── file-upload.tsx      # Generic file upload component
│   ├── layouts/                 # ✅ KEEP - Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── app-layout.tsx
│   └── providers/               # ✅ KEEP - Context providers
│       └── theme-provider.tsx
├── hooks/                       # ✅ KEEP - Custom React hooks
│   ├── use-media-query.ts       # Responsive breakpoints
│   ├── use-local-storage.ts     # Browser storage with SSR safety
│   ├── use-debounce.ts          # Input debouncing
│   └── use-api.ts               # API fetching with loading/error states
├── lib/
│   ├── api/                     # ✅ KEEP - API client infrastructure
│   │   ├── client.ts            # Fetch wrapper with error handling
│   │   ├── endpoints.ts         # API URL constants
│   │   └── types.ts             # API response types
│   ├── validations/             # ✅ KEEP - Zod schemas
│   │   ├── auth.ts              # Login, register schemas
│   │   ├── common.ts            # Reusable validators
│   │   └── index.ts
│   ├── types/                   # ✅ KEEP - Shared TypeScript types
│   │   ├── index.ts             # Common types
│   │   └── models.ts            # Data model patterns
│   ├── utils/                   # ✅ KEEP - Organized utilities
│   │   ├── cn.ts                # Tailwind class merger
│   │   ├── formatters.ts        # Date, currency, number formatting
│   │   ├── validators.ts        # Runtime validators
│   │   └── index.ts
│   ├── constants.ts             # ✅ KEEP - App-wide constants
│   └── env.ts                   # ✅ KEEP - Typed environment variables
├── public/
│   ├── images/                  # ✅ KEEP - Your images go here
│   └── icons/                   # ✅ KEEP - Your icons go here
├── .env.example                 # ✅ KEEP - Environment variables template
└── components.json              # ✅ KEEP - shadcn configuration
```

---

## 🎨 Color System

### Color Tokens
The project uses custom oklch color tokens defined in `app/globals.css` with **full dark mode support**:

**Light Mode (`:root`):**
- `--background`: #F9FAFB (soft gray)
- `--foreground`: #1C1C1C (near black)
- `--primary`: #2D3E50 (ink blue)
- `--secondary`: #E6E2DA (warm beige)
- `--muted`: #F3F4F6 (light gray)
- `--accent`: #E6E2DA (matches secondary)
- `--destructive`: #D92D20 (red)

**Dark Mode (`.dark`):**
- `--background`: #1A1A1A (dark gray)
- `--foreground`: #F0F0F0 (light gray)
- `--primary`: #5B8FC7 (lighter blue)
- All color tokens have dark mode variants

### Dark Mode
The boilerplate includes `next-themes` for seamless dark mode:
- **Theme Toggle**: Sun/Moon button in header (light/dark/system)
- **Persistent**: User preference saved in localStorage
- **System Detection**: Automatically follows OS theme preference
- **No Flash**: Uses `suppressHydrationWarning` to prevent FOUC

### Customizing Colors
Edit the `:root` and `.dark` sections in `app/globals.css` to customize your color palette. All components automatically inherit these tokens via CSS variables.

---

## 🧩 Component Organization

### UI Components (`components/ui/`)
These are shadcn components installed via CLI. **Don't edit directly** unless you want to customize globally.

**Installed Components:**
- accordion, alert, alert-dialog, avatar, badge, button, card, checkbox, dialog, dropdown-menu, input, label, popover, radio-group, select, separator, skeleton, slider, switch, table, tabs, textarea, tooltip, form, sonner

**Adding More Components:**
```bash
$ npx shadcn@latest add <component-name>
```

### Shared Components (`components/shared/`)
Your custom reusable components that aren't part of shadcn.

**Included Components:**
- `icon-badge.tsx` - Icon container with type1/type2 variants
- `theme-toggle.tsx` - Dark mode toggle with dropdown

**Example:**
```tsx
// components/shared/my-custom-component.tsx
export function MyCustomComponent() {
  return <div>Custom logic here</div>
}
```

### Providers (`components/providers/`)
Context providers for app-wide state.

**Included:**
- `theme-provider.tsx` - Wraps next-themes for dark mode

### Layout Components (`components/layouts/`)
Structural components for page layouts.

**AppLayout Example:**
```tsx
import { AppLayout } from "@/components/layouts/app-layout"

export default function MyPage() {
  return (
    <AppLayout>
      <h1>My Page Content</h1>
    </AppLayout>
  )
}
```

---

## 📋 Common Patterns

### Forms with Validation
```tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
})

export function MyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", name: "" },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

### Toast Notifications
```tsx
import { toast } from "sonner"

// Success
toast.success("Registration successful!")

// Error
toast.error("Something went wrong")

// Info
toast.info("Please verify your email")
```

### Icons with Theme Colors
```tsx
import { Mail, User, Settings } from "lucide-react"

// Icons inherit color via className
<Mail className="h-4 w-4 text-primary" />
<User className="h-6 w-6 text-muted-foreground" />
<Settings className="h-5 w-5 text-destructive" />
```

---

## 🚀 Starting a New Project from This Boilerplate

**This boilerplate is designed to be cloned and customized for your specific project.** Follow these steps to get started.

### Prerequisites
- ✅ This boilerplate is installed and working (you can run `npm run dev`)
- ✅ You have Claude Code available to help with coding
- ✅ You're ready to start a new project

---

### Step 1: Copy the Boilerplate

**Option A: Manual Copy (Windows)**
1. Copy the entire `boilerplate_theme` folder
2. Paste it to your desired location
3. Rename the folder to your project name (e.g., `supplier-management`)

**Option B: Using Claude Code**
Tell Claude Code:
```
"Copy this entire project to a new folder called [your-project-name] in [location]"
```

---

### Step 2: Update Project Identity

**Tell Claude Code:**
```
"Update package.json with the following:
- name: [your-project-name]
- description: [your project description]
- version: 1.0.0
- author: [your name]"
```

**What this does:**
- Changes the project name in package.json
- Updates metadata for your new project

---

### Step 3: Delete Example Content

**Tell Claude Code:**
```
"Delete the app/(examples) folder and replace app/page.tsx with a simple landing page that says 'Welcome to [Your Project Name]'"
```

**What this does:**
- Removes the example registration page (you don't need it anymore)
- Creates a clean landing page for your project
- You now have a blank slate to build your features

---

### Step 4: Set Up Environment Variables

**Tell Claude Code:**
```
"Create a .env.local file based on .env.example"
```

Then manually edit `.env.local` and add your actual values:
- API URLs for your backend
- Database connection strings (if you use a database)
- API keys for third-party services

**Important:** Never share your `.env.local` file or commit it to git. It contains sensitive information.

---

### Step 5: Customize Theme Colors (Optional)

If you want different colors for your brand:

**Tell Claude Code:**
```
"Update the color scheme in app/globals.css to use [describe your desired colors, e.g., 'a blue primary color and green accents']"
```

**What this does:**
- Updates your theme colors in both light and dark mode
- All components automatically use the new colors

---

### Step 6: Start Building Your Features

Now you're ready to build! Here's how to add features using Claude Code:

**Example: Adding a "Suppliers" page**

**Tell Claude Code:**
```
"Create a new page at /app/suppliers/page.tsx that shows a list of suppliers using the DataTable component from components/shared/data-table.tsx"
```

**Example: Adding an API endpoint**

**Tell Claude Code:**
```
"Create a new API route at /app/api/suppliers/route.ts that returns a list of suppliers from my database"
```

**Example: Adding a form**

**Tell Claude Code:**
```
"Create a supplier registration form using React Hook Form and Zod validation. Use the validation schemas from lib/validations"
```

---

### Step 7: Verify Everything Works

**Tell Claude Code:**
```
"Start the development server"
```

Or run manually:
```bash
$ npm run dev
```

Visit http://localhost:3000 and verify:
- ✅ Your landing page appears
- ✅ Theme toggle works (try light/dark mode)
- ✅ No console errors
- ✅ Pages load correctly

---

## 📋 What You Have Ready to Use

When you start your new project, you already have:

### ✅ Infrastructure (Ready to Use)
- **Theme System**: Dark mode, custom colors, responsive design
- **UI Components**: 25+ professionally designed components from shadcn/ui
- **Custom Hooks**: 4 hooks for common patterns (media queries, localStorage, debouncing, API calls)
- **API Client**: Pre-configured fetch wrapper with error handling
- **Form Validation**: Zod schemas for common patterns (email, password, phone, etc.)
- **Type Safety**: TypeScript types for common data structures
- **Utilities**: Date formatting, currency formatting, validators, and more
- **Error Handling**: Error boundaries and loading states set up

### 🔄 What to Replace
- **app/page.tsx**: Replace with your landing page
- **Metadata**: Update author, description, URLs in app/layout.tsx

### 🗑️ What to Delete
- **app/(examples) folder**: Delete the entire folder after you've studied it

### 🎨 What to Customize
- **Colors**: Edit app/globals.css if you want different brand colors
- **Constants**: Edit lib/constants.ts to match your app's settings (pagination, file limits, etc.)
- **Env Variables**: Add your specific environment variables in lib/env.ts

---

## 💡 Tips for Working with Claude Code

### When You Need to Add Features

**Be specific about what you want:**
✅ Good: "Create a suppliers management page with a table showing name, email, status, and an edit button for each row"
❌ Vague: "Add a suppliers page"

**Reference existing patterns:**
✅ Good: "Create a user profile form similar to the registration example, using React Hook Form and Zod validation"
❌ Generic: "Make a form"

**Ask for explanations when needed:**
✅ "Before implementing, explain how I should structure the database for this feature"
✅ "What's the best way to handle authentication in this project?"

### When You're Stuck

**Tell Claude Code:**
- "Show me an example of how to use the DataTable component"
- "How do I add a new API endpoint?"
- "Walk me through creating a new page with a form"
- "I'm getting an error [paste error], how do I fix it?"

### Common Tasks

**Adding a new page:**
```
"Create a new page at /app/[route-name]/page.tsx"
```

**Adding a new component:**
```
"Create a new component in components/shared/ called [name] that [description]"
```

**Adding validation:**
```
"Create a Zod schema in lib/validations for [what you're validating]"
```

**Adding an API route:**
```
"Create an API route at /app/api/[name]/route.ts that [what it does]"
```

---

## 🔧 Using as a Boilerplate

### For New Projects:
1. **Copy this directory** to your new project location
2. **Update package.json** - change name, version, description
3. **Clear app/page.tsx** - replace with your landing page
4. **Keep components/** - all components are ready to use
5. **Update this claude.md** - document your project-specific setup

### What to Keep:
- ✅ `app/globals.css` (color tokens - light & dark)
- ✅ `app/layout.tsx` (root layout with ThemeProvider)
- ✅ `app/error.tsx`, `app/global-error.tsx`, `app/not-found.tsx` (error handling)
- ✅ `app/loading.tsx` (loading states)
- ✅ `components/ui/` (all shadcn components)
- ✅ `components/shared/` (custom components including theme-toggle)
- ✅ `components/layouts/` (reusable layouts with theme support)
- ✅ `components/providers/` (ThemeProvider)
- ✅ `lib/utils.ts` (utilities)
- ✅ `.env.example` (environment template)
- ✅ `next.config.ts` (security headers)

### What to Modify:
- 📝 `app/page.tsx` - Your home page
- 📝 `app/layout.tsx:24-25,38` - Update author & URLs in metadata
- 📝 Create new routes in `app/`
- 📝 Add your components to `components/shared/`
- 📝 Customize theme colors in `globals.css` (both `:root` and `.dark`)

---

## 📚 Reference Pages

### Component Showcase
**URL:** http://localhost:3000
**Purpose:** Demonstrates all shadcn components with consistent styling
**Use:** Reference for available components and their variants

### Registration Example
**URL:** http://localhost:3000/register
**Purpose:** Real-world form with validation + data table
**Use:** Reference for forms, validation, state management, and tables

---

## 🛠 Technology Stack

- **Framework:** Next.js 15.5.4 (with Turbopack)
- **React:** 19.1.0
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Toasts:** Sonner
- **Theme:** next-themes (dark mode)
- **Animations:** tw-animate-css
- **Language:** TypeScript 5

---

## 📦 Scripts Summary

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 💡 Tips

1. **Mobile-First:** All components are designed mobile-first, test on small screens first
2. **Color Tokens:** Use semantic tokens (`text-foreground`, `bg-primary`) not hardcoded colors
3. **Dark Mode:** Test both light and dark themes - use ThemeToggle component in header
4. **Component Composition:** Combine small components to build complex UIs
5. **Validation:** Always use Zod schemas for form validation
6. **Accessibility:** shadcn components are accessible by default, maintain this in custom components
7. **Error Handling:** Custom error.tsx files automatically catch errors in route segments
8. **Loading States:** Add loading.tsx files for better UX during data fetching
9. **Environment Variables:** Use .env.example as template, never commit .env.local

---

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)

---

---

## 🆕 Phase 1 Additions (Production-Ready Features)

### Error Handling
- **`app/error.tsx`**: Route-level error boundary with styled error UI
- **`app/global-error.tsx`**: Root-level error handler (last resort)
- **`app/not-found.tsx`**: Custom 404 page with theme support

### Dark Mode Support
- **`next-themes`** package installed
- **`components/providers/theme-provider.tsx`**: Theme context wrapper
- **`components/shared/theme-toggle.tsx`**: Sun/Moon toggle with dropdown (light/dark/system)
- **Dark mode tokens** in `app/globals.css` (`.dark` selector)
- **Theme toggle** added to header navigation

### Loading States
- **`app/loading.tsx`**: Root-level loading skeleton
- **`app/register/loading.tsx`**: Route-specific loading example
- Demonstrates proper use of Skeleton components

### Environment Setup
- **`.env.example`**: Comprehensive template with examples for common services
- Documented sections: Next.js config, databases, auth, third-party APIs

### Security & Metadata
- **Security headers** in `next.config.ts`: HSTS, X-Frame-Options, CSP, etc.
- **Updated metadata** in `app/layout.tsx`: Title templates, OpenGraph, Twitter cards
- **Proper SEO structure** for production deployment

### Documentation
- **README.md**: Complete rewrite with features, setup, and usage
- **claude.md**: Updated with Phase 1 features and dark mode instructions

---

---

## 🎨 Phase 2 Additions (Developer Experience)

### Prettier Configuration
- **`.prettierrc`**: Code formatting rules
  - No semicolons, double quotes, 2-space tabs
  - Trailing commas (ES5), 100 character print width
- **`.prettierignore`**: Excludes node_modules, .next, lock files, etc.
- **Auto-formats on save** when VS Code settings are applied

### Enhanced ESLint
- **`eslint.config.mjs`**: Extended with additional rules
  - **TypeScript**: Warn on unused vars (allow `_` prefix), prefer type imports, warn on `any`
  - **React**: Self-closing components, curly brace consistency, hooks deps
  - **General**: No console.log (allow warn/error), prefer const, no var
  - **Quality**: Strict equality (===), multi-line curly braces

### VS Code Workspace Settings
- **`.vscode/settings.json`**: Optimal editor configuration
  - ✅ Format on save with Prettier
  - ✅ ESLint auto-fix on save
  - ✅ Tailwind CSS IntelliSense configured
  - ✅ TypeScript workspace version
  - ✅ Consistent tab/spacing settings
  - ✅ Trim trailing whitespace, insert final newline

- **`.vscode/extensions.json`**: Recommended extensions
  - **Essential**: Prettier, ESLint, Tailwind CSS IntelliSense
  - **Recommended**: Error Lens, Better Comments, Pretty TS Errors
  - **Optional**: Auto Rename Tag, Code Spell Checker, GitLens

### Usage
When you open this project in VS Code:
1. You'll see a prompt to install recommended extensions
2. Code will auto-format on save (Prettier)
3. ESLint warnings/errors appear inline
4. Tailwind classes have autocomplete

---

## 🏗️ Phase 3 Additions (Enterprise Infrastructure)

### Custom Hooks (`/hooks`)
- **`use-media-query.ts`**: Responsive breakpoint detection for mobile/tablet/desktop
- **`use-local-storage.ts`**: Browser storage with SSR safety and JSON serialization
- **`use-debounce.ts`**: Input debouncing for search optimization
- **`use-api.ts`**: API fetching with loading/error state management

### API Client Infrastructure (`/lib/api`)
- **`client.ts`**: Generic fetch wrapper with error handling, retry logic, auth headers
- **`endpoints.ts`**: Centralized API endpoint definitions
- **`types.ts`**: Generic API types (ApiResponse, ApiError, Pagination, etc.)

### Validation Schemas (`/lib/validations`)
- **`auth.ts`**: Login, register, forgot password, reset password schemas
- **`common.ts`**: Reusable validators (email, phone, URL, file upload, dates, etc.)
- **`index.ts`**: Central export point for all validations

### TypeScript Types (`/lib/types`)
- **`index.ts`**: Common types (User, Pagination, SortConfig, FilterConfig, etc.)
- **`models.ts`**: Example data model patterns (BaseModel, Profile, Address, etc.)

### Organized Utilities (`/lib/utils`)
Reorganized from single file into organized structure:
- **`cn.ts`**: Tailwind class merging utility
- **`formatters.ts`**: Date, currency, number, file size, phone formatting
- **`validators.ts`**: Runtime validation helpers (email, URL, phone, etc.)
- **`index.ts`**: Central export point

### Configuration Files
- **`lib/env.ts`**: Type-safe environment variables with Zod validation
- **`lib/constants.ts`**: App-wide constants (pagination, file limits, routes, etc.)

### API Route Example (`/app/api/example`)
- **`route.ts`**: Complete example showing GET and POST handlers with error handling

### Shared Components (`/components/shared`)
- **`data-table.tsx`**: Generic reusable table with sorting, pagination, filtering
- **`file-upload.tsx`**: File upload with drag-drop, preview, validation

### Route Organization
- **`app/(examples)/`**: Route group for example content (clearly marked for deletion)
- Moved `register` into examples group to make it obvious it's deletable

### Public Folder Organization
- **`public/images/`**: Organized folder for image assets
- **`public/icons/`**: Organized folder for icon assets
- Removed default Next.js SVG files

### Documentation Enhancements
- **Complete "Starting a New Project" guide**: Step-by-step for non-technical users
- **Claude Code integration tips**: How to effectively use Claude Code with this boilerplate
- **Updated project structure**: Clear indicators of what to KEEP, DELETE, REPLACE
- **Common task examples**: Ready-to-use prompts for Claude Code

---

**Last Updated:** 2025-10-06 (Phase 3 Complete - Enterprise Infrastructure)
**Created with Claude Code**
