# CLAUDE.md - Documentation Guidelines

This file provides guidance to Claude Code when working with documentation in this directory.

## MDX Syntax Rules

**CRITICAL**: This documentation uses MDX (Markdown + JSX), which requires special handling of certain characters.

### Common MDX Syntax Errors to Avoid

#### 1. Less-than/Greater-than Characters (`<` and `>`)

**WRONG** - Direct use of `<` or `>` in text:

```markdown
Float or pull low (<0.8V) = Enable
Input voltage range: 4V - 40V (>5V recommended)
```

**CORRECT** - Use HTML entities:

```markdown
Float or pull low (&lt;0.8V) = Enable
Input voltage range: 4V - 40V (&gt;5V recommended)
```

**Why**: MDX interprets `<` as the start of a JSX tag.

**Alternative solutions**:

- Use HTML entities: `&lt;` for `<`, `&gt;` for `>`
- Use code blocks: `` `<0.8V` ``
- Rephrase: "below 0.8V" instead of "<0.8V"

#### 2. Curly Braces (`{` and `}`)

**WRONG** - Direct use in text:

```markdown
Use the formula {VIN - VOUT} to calculate dropout
```

**CORRECT** - Escape or use code:

```markdown
Use the formula `{VIN - VOUT}` to calculate dropout
```

**Why**: MDX interprets `{...}` as JavaScript expressions.

### Quick Checklist Before Saving MDX Files

- [ ] Search for `<` in regular text (not in code blocks) -> Replace with `&lt;`
- [ ] Search for `>` in regular text (not in code blocks) -> Replace with `&gt;`
- [ ] Search for `{` `}` in regular text -> Wrap in backticks or use entities
- [ ] Test compilation by checking Docusaurus dev server for errors

## Sidebar Management

**CRITICAL**: When adding new documentation pages or reorganizing content, you MUST update the sidebar configuration in `sidebars.js`.

### Sidebar Configuration Location

**File:** `/doc/sidebars.js`

### Adding a New Page

**Step 1:** Create the markdown file in the appropriate directory:

```bash
# Example: Adding a new page to inbox
touch docs/inbox/my-new-page.md
```

**Step 2:** Update `sidebars.js` to include the new page:

```javascript
inboxSidebar: [
  'inbox/index',
  'inbox/current-status',
  'inbox/my-new-page',  // <- Add new page here
],
```

### Sidebar Best Practices

1. **Path Format**: Use relative paths without file extensions

   ```javascript
   'inbox/my-page'; // Correct
   'inbox/my-page.md'; // Wrong - no extension
   '/inbox/my-page'; // Wrong - no leading slash
   ```

2. **Consistent Naming**: Match the file path exactly

   ```
   docs/inbox/my-page.md  ->  'inbox/my-page'
   ```

## Integration with Main Documentation

This documentation is part of a Docusaurus site. When creating content:

- Place files in the appropriate section (overview/, components/, learning/, inbox/)
- Cross-reference from other documents using relative links
- Keep technical accuracy paramount
- Use English for all text and labels
