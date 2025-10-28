# Supplier Outsourcing Register

A demo application for managing supplier outsourcing arrangements in compliance with **CSSF Circular 22/806 Section 4.2.7**. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4.

---

## 📋 Quick Overview

**Purpose:** CSSF-compliant supplier outsourcing register for Luxembourg financial institutions
**Target:** Desktop-first demo (mobile not prioritized)
**Deployment:** Vercel
**User:** Non-technical user relying on Claude Code for all development

---

## 🚀 Quick Start

```bash
$ npm run dev          # Start development server (localhost:3000)
$ npm run build        # Build for production
$ npm run lint         # Check code quality
```

---

## 🛠 Tech Stack

- **Framework:** Next.js 15.5.4 (App Router, Turbopack)
- **React:** 19.1.0
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI:** shadcn/ui (25+ components) + Lucide icons
- **Forms:** React Hook Form + Zod
- **Theme:** Light mode only

---

## ✅ Current Status (Updated: 2025-10-25)

**Phase 1: Frontend Demo - COMPLETE** ✅

### What Works:
- **Supplier Register Table** - View, filter, search 73 CSSF-compliant fields
- **Add Supplier Form** - Complete 4-tab form with pending fields feature
- **Validation System** - Two-layer approach (see `context/VALIDATION.md`)
- **Filtering** - Quick filters, custom filters, global text search with highlighting
- **Pending Fields** - Mark incomplete fields, auto-mark on draft, skip validation
- **Build & Deployment** - All TypeScript errors fixed, ready for Vercel

### Recent Changes (Oct 25, 2025):
- ✅ **Removed Zod content validation** - No more red borders on blur
- ✅ **Fixed 4 Vercel build errors** - TypeScript, unused functions resolved
- ✅ **Validation happens ONLY on save** - Dialog shows missing fields
- ✅ **All 73 fields work with pending feature** - Amber badges, skip validation
- ✅ **Group Entities field removed** - Per CSSF requirements
- ✅ **All fields made mandatory** - Except LEI and Parent Company

---

## 📚 Detailed Documentation

For detailed information, see these files:

- **[ARCHITECTURE.md](context/ARCHITECTURE.md)** - How the app works (components, data flow, file structure)
- **[VALIDATION.md](context/VALIDATION.md)** - Current validation approach (two-layer system)
- **[ROADMAP.md](context/ROADMAP.md)** - Next priorities: Edit Supplier → Data Persistence
- **[Completed Work](context/completed/)** - Archive of finished PRDs and changelogs

---

## 🎯 Next Priorities

1. **Edit Supplier** (High Priority) - Reuse form with pre-filled data
2. **Data Persistence** (High Priority) - localStorage or sessionStorage
3. **Duplicate Supplier** (Medium) - Clone with new reference number
4. **Export** (Medium) - Excel/PDF export
5. **Dashboard** (Low) - Analytics and charts

See full roadmap in `context/ROADMAP.md`

---

## 🏛️ CSSF Compliance

This app implements **CSSF Circular 22/806 Section 4.2.7** requirements:

- **Point 53:** Status of outsourcing arrangement
- **Point 54:** Mandatory fields for ALL suppliers (23 fields)
- **Point 54.h:** Cloud service fields (6 fields, conditional)
- **Point 55:** Critical function fields (18+ fields, conditional)

**Total Fields:** 73 CSSF-compliant fields across 4 tabs

**Mandatory Fields:** All except LEI and Parent Company
**Conditional Fields:** Cloud (when category=Cloud), Critical (when isCritical=Yes)

Full mapping available in `context/ARCHITECTURE.md`

---

## 🎨 Design Principles

1. **Desktop-First** - Optimized for desktop screens (mobile not prioritized)
2. **CSSF Annotations** - All fields labeled with circular points (54.a, 55.c, etc.)
3. **Semantic Colors** - Uses CSS variables (--primary, --foreground, etc.)
4. **Type Safety** - 100% TypeScript coverage
5. **Accessibility** - shadcn components maintain WCAG AAA standards

---

## 💡 Key Patterns

### Adding New Fields
See `context/workflows/ADD_MANDATORY_FIELD.md` for step-by-step guide

### Debugging Forms
See `context/workflows/DEBUG_FORM.md` for common issues

### Deployment
See `context/workflows/DEPLOY.md` for Vercel checklist

---

## 🐛 Known Issues

- **Edit/Duplicate/Delete actions** - UI only (not functional yet)
- **Data resets on refresh** - No persistence yet (sessionStorage planned)
- **Dashboard view** - Placeholder only

---

## 📊 Project Metrics

- **Components:** 65+ (25+ shadcn/ui + 40+ custom)
- **Form Fields:** 73 CSSF-compliant fields
- **Lines of Code:** ~8,000+ (excluding dependencies)
- **TypeScript Coverage:** 100%
- **Build Status:** ✅ Successful (0 errors, 0 warnings)

---

## 🔗 External Resources

- [CSSF Circular 22/806](https://www.cssf.lu/en/Document/circular-cssf-22-806/)
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)

---

**Created with Claude Code** | Last Updated: 2025-10-25
