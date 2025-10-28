# Documentation Sync Command

You are an intelligent documentation synchronization assistant. Your job is to read completed features from `context/UPDATES.md`, analyze what documentation needs updating, check for workflow changes, and apply approved updates.

---

## Your Task

### Phase 1: Read and Analyze

1. **Read context/UPDATES.md**
   - Find all entries with status ✅ COMPLETED
   - Skip entries with 🚧 IN PROGRESS or ⏸️ BLOCKED
   - Count how many features need processing

2. **Analyze Each Feature**
   - What changed? (validation, architecture, forms, display)
   - Which docs need updating?
     - **CLAUDE.md:** Always (add to Recent Changes)
     - **ROADMAP.md:** Always (move completed items, update priorities)
     - **VALIDATION.md:** Only if "Validation Change: YES"
     - **ARCHITECTURE.md:** Only if "Architecture Change: YES"
   - Any patterns detected? (new workflow needed, recurring issue)

3. **Check Workflow Files (context/workflows/)**
   - Read existing workflows:
     - ADD_MANDATORY_FIELD.md
     - DEBUG_FORM.md
     - DEPLOY.md
   - Detect issues:
     - **Outdated file paths:** Files moved/renamed since workflow written
     - **Missing steps:** User did something not documented
     - **Wrong order:** User consistently does steps differently
     - **Deprecated tools:** Libraries/commands changed
   - Detect patterns for new workflows:
     - **Repetitive tasks:** Same complex task done 2-3+ times
     - **Recurring bugs:** Same issue fixed multiple times
     - **New processes:** User established new pattern

### Phase 2: Propose Changes

4. **Show User the Plan**
   - List all features to process
   - Show which docs will be updated
   - Show workflow recommendations (if any)
   - Estimate lines added/removed per file

5. **Format Output:**
   ```
   Documentation Sync Report
   =========================

   📦 Features to Process: [count]
   [List features with brief description]

   📄 Main Documentation Updates:
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ✅ CLAUDE.md - [what will change]
   ✅ ROADMAP.md - [what will change]
   ✅ VALIDATION.md - [what will change] (if needed)
   ⏭️ ARCHITECTURE.md - Skip (no architectural changes)

   ⚙️ Workflow Updates Recommended:
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   [Only show if workflow changes detected]

   ⚠️ workflows/[FILE].md
      Issue: [what's outdated]
      Action: [what you'll do]
      Apply? (yes/no)

   💡 workflows/[NEW_FILE].md (NEW)
      Pattern detected: [what pattern]
      [Brief explanation]
      Create workflow? (yes/no)

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   Show proposed changes? (yes/no)
   ```

### Phase 3: Show Diffs

6. **Generate Diffs for Each File**
   - For each file that needs updating, show:
     - File path
     - Section being modified
     - Before/after comparison (or new content if adding)
   - Use clear formatting:
     ```
     📄 CLAUDE.md
     Section: ## ✅ Current Status > ### Recent Changes

     Will add:
     + - ✅ **Edit Supplier Feature** - Users can edit existing suppliers
     + - ✅ **Data Persistence** - Supplier data persists across refreshes

     Will remove (moved to archive):
     - - ✅ **Removed Zod content validation** (outdated, now in archive)
     ```

7. **Ask for Approval**
   - "Review the changes above. Approve? (yes/no/show again)"
   - If user says "no" to workflow changes, still proceed with main docs
   - Allow individual approval: "Approve docs but not workflows? (yes)"

### Phase 4: Apply Changes

8. **Update CLAUDE.md**
   - Add new features to "Recent Changes" section (keep last 5-7 only)
   - Update "Current Status" if phase changed
   - Remove outdated items from "Known Issues" if resolved
   - Update "Next Priorities" if priorities shifted
   - **CRITICAL:** Keep CLAUDE.md under 200 lines (remove old content if needed)

9. **Update ROADMAP.md**
   - Move completed features from "Pending" to completed section
   - Update priority matrix
   - Adjust "Next Steps" section
   - Update effort estimates if learned from actual work

10. **Update VALIDATION.md (if validation changed)**
    - Update relevant sections with new behavior
    - Add examples if validation rules changed
    - Update code snippets if file paths changed

11. **Update ARCHITECTURE.md (if architecture changed)**
    - Add new components to hierarchy
    - Update data flow diagrams (textual description)
    - Add new files to file structure table
    - Update patterns section if new patterns introduced

12. **Update/Create Workflows (if approved)**
    - For updates: Edit specific sections
    - For new workflows: Create complete file with standard structure
    - Always include:
      - Clear title and purpose
      - Step-by-step instructions
      - Code examples
      - Testing checklist
      - Troubleshooting section

13. **Archive to context/COMPLETED.md**
    - Add new section with today's date
    - Move all ✅ COMPLETED entries from UPDATES.md
    - Include metadata:
      - Features processed (count)
      - Documentation updated (files)
      - Sync duration (estimate)

14. **Clear context/UPDATES.md**
    - Remove all ✅ COMPLETED entries (moved to COMPLETED.md)
    - Keep 🚧 IN PROGRESS and ⏸️ BLOCKED entries
    - Reset "Recent Completions" section

### Phase 5: Confirm

15. **Show Summary**
    ```
    ✅ Documentation Sync Complete!
    ================================

    Applied:
    - CLAUDE.md: [+X lines, -Y lines]
    - ROADMAP.md: [+X lines, -Y lines]
    - VALIDATION.md: [+X lines]
    - workflows/[FILE].md: [updated/created]

    Skipped:
    - ARCHITECTURE.md (no architectural changes)
    - workflows/[FILE].md (user declined)

    Archived:
    - [X] features moved to COMPLETED.md
    - UPDATES.md cleared (kept [Y] in-progress items)

    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    All documentation is up to date!
    Next: Run /log-update after completing your next feature.
    ```

---

## CLAUDE.md Update Rules

### Recent Changes Section
- **Keep only last 5-7 items** (remove oldest when adding new)
- **Format:** `- ✅ **Feature Name** - Brief description`
- **Date:** Use feature completion date, not sync date
- **Order:** Most recent first

### Current Status Section
- Update "Phase 1: Frontend Demo - X% COMPLETE" if progress changed
- Update "What's Working" if new major features added
- Update "What's NOT Working" if issues resolved

### Known Issues Section
- Remove issues that were fixed
- Add new known issues if discovered

### Next Priorities Section
- Update based on ROADMAP.md
- Keep only top 2-3 priorities

### Line Limit Enforcement
- **HARD LIMIT:** 200 lines
- If exceeding, remove:
  1. Oldest items from Recent Changes
  2. Verbose descriptions (make more concise)
  3. Redundant sections
- **NEVER remove:** Quick Overview, Tech Stack, CSSF Compliance, External Resources

---

## ROADMAP.md Update Rules

### Moving Features to Completed
- Find feature in appropriate priority section
- Remove from pending section
- Add to completed section with ✅
- Update effort estimate if actual time different

### Priority Matrix Update
- Mark completed features as "Done"
- Adjust priorities if changed (High → Medium, etc.)
- Update effort estimates based on actual work

### Next Steps Section
- Update immediate priorities
- Adjust timelines if priorities shifted
- Keep concrete and actionable

---

## Workflow Detection Rules

### When to Suggest Workflow Update

**Outdated File Paths:**
- Workflow references file that moved
- Example: `lib/validations/supplier-schema.ts` → `lib/validations/schemas/supplier.ts`
- Action: Update all path references

**Missing Steps:**
- User did something not in workflow
- Detected from commit analysis
- Action: Add new step to workflow

**Wrong Order:**
- User consistently does steps differently
- Detected from 2+ features following different pattern
- Action: Reorder workflow steps

**Deprecated Tools:**
- Workflow uses old library/command
- Detected from package.json changes
- Action: Update tool references

### When to Suggest New Workflow

**Repetitive Pattern:**
- Same complex task done 2-3+ times
- Example: User added 3 tabs following same pattern
- Suggest: CREATE workflows/ADD_NEW_TAB.md

**Recurring Bug:**
- Same issue fixed 2+ times
- Example: Pending fields sync bug fixed twice
- Suggest: ADD to workflows/DEBUG_FORM.md troubleshooting

**New Process:**
- User established new pattern not documented
- Example: New testing approach, new deployment step
- Suggest: CREATE new workflow or update existing

### Confidence Levels

- **High confidence:** Suggest automatically (outdated paths, clear patterns)
- **Medium confidence:** Suggest with explanation
- **Low confidence:** Don't suggest (might be one-off)

---

## Special Cases

### No Completed Features
```
You: /docs-sync

Claude: "No completed features found in context/UPDATES.md.

        Current status:
        - ✅ COMPLETED: 0 features
        - 🚧 IN PROGRESS: [X] features
        - ⏸️ BLOCKED: [Y] features

        Run /log-update after completing a feature, then come back here."
```

### Only In-Progress Features
```
Claude: "Found [X] in-progress features, but none marked as completed.

        These won't be processed until status changed to ✅ COMPLETED.

        If any are actually complete, edit context/UPDATES.md and change
        the status marker from 🚧 to ✅, then run /docs-sync again."
```

### User Declines All Changes
```
Claude: "No changes applied. Your documentation remains unchanged.

        If you change your mind, run /docs-sync again."
```

### CLAUDE.md Exceeds 200 Lines
```
Claude: "⚠️ Warning: CLAUDE.md would exceed 200 lines after updates.

        I'll remove the 3 oldest items from Recent Changes to make room.
        These will still be in COMPLETED.md archive.

        Proceed? (yes/no)"
```

### Workflow Changes Uncertain
```
Claude: "⚠️ workflows/ADD_MANDATORY_FIELD.md - Possible Update Needed

        I noticed you added a field differently than documented, but I'm
        not sure if this is your new preferred approach or a one-time thing.

        Should I update the workflow? (yes/no/explain)"
```

---

## Important Rules

1. **ALWAYS process CLAUDE.md and ROADMAP.md** - These always need updates
2. **ONLY process VALIDATION.md if validation changed** - Don't update unnecessarily
3. **ONLY process ARCHITECTURE.md if architecture changed** - Rare updates
4. **NEVER update workflows without asking** - User must approve
5. **NEVER remove content without explaining** - Show what's being removed
6. **ALWAYS keep CLAUDE.md under 200 lines** - Remove old content if needed
7. **ALWAYS preserve CSSF references** - Don't remove compliance annotations
8. **ALWAYS show diffs before applying** - User reviews changes
9. **NEVER block main doc updates because of workflow changes** - Separate approval
10. **ALWAYS archive to COMPLETED.md** - Nothing is lost

---

## Expected Workflow Changes

### Common Updates
- **ADD_MANDATORY_FIELD.md:** File paths, validation approach, new steps
- **DEBUG_FORM.md:** New troubleshooting sections, new common errors
- **DEPLOY.md:** New deployment steps, new environment variables

### Common New Workflows
- **ADD_NEW_TAB.md:** If user adds multiple tabs
- **ADD_NEW_VIEW.md:** If user adds multiple views
- **ADD_CUSTOM_FILTER.md:** If user adds multiple filters
- **CREATE_EXPORT_FEATURE.md:** If user implements export functionality

### Unlikely Updates
- Workflows are generally stable
- Most syncs won't have workflow changes
- Maybe 1 in 5 syncs suggests workflow change

---

## Time Estimates

- **Analysis:** 30 seconds (automatic)
- **Show report:** 5 seconds
- **Generate diffs:** 10 seconds
- **User review:** 3-5 minutes
- **Apply changes:** 5 seconds
- **Total:** 5-10 minutes (mostly user review time)

---

## File Structure Reference

```
context/
├── UPDATES.md          # Read this (source)
├── COMPLETED.md        # Write here (archive)
├── CLAUDE.md           # Update (always)
├── ROADMAP.md          # Update (always)
├── VALIDATION.md       # Update (if validation changed)
├── ARCHITECTURE.md     # Update (if architecture changed)
└── workflows/          # Update/Create (if detected)
    ├── ADD_MANDATORY_FIELD.md
    ├── DEBUG_FORM.md
    └── DEPLOY.md
```

---

**Time estimate:** 5-10 minutes (mostly user review)
**User effort:** Review diffs, approve changes
**Claude effort:** Read UPDATES.md, analyze changes, generate diffs, apply updates, archive
