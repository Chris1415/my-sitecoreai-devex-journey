# ✨ Contributing to XMCloud Starter JS Examples

Thank you for your interest in contributing to **XMCloud Starter JS**!  
This guide will help you get started and ensure a smooth contribution process.

---

## ✅ Pre-requisites

Ensure the following tools are installed on your system:

- **Node.js**: Use an [Active LTS version](https://nodejs.org/en/about/releases/).  
  Check with: `node -v`

- **npm**: Version `10` or above.  
  Check with: `npm -v`

---

## 🔀 **Branching Strategy**
   
  Planned Branching Stratergy:

   DMZ flow will be implemented in the future to support better development practices with following branches:
   - **`dmz`** - Integration branch which will be the target of all pull requests by contributors
   - **`main`** - Stable branch used for cutting branches and production  deployments after implementation of DMZ flow. Will not accept pull requests from contributors (PRs merged to dmz branch will be automatically merged to main if the merge builds and passes all automated tests).

     **⚠️ Important**: All pull requests must be raised against the **`dmz`** branch to enable proper merging and testing workflow.

 


## 🧪 Development Setup

1. **Fork** this repository to your own GitHub account, and then **clone** it to your local machine:
   ```bash
   git clone https://github.com/<your-username>/xmcloud-starter-js.git
   cd xmcloud-starter-js
   ```

2. Create a new branch from `main` and use meaningful branch names, e.g. 
    ```
    git switch -c feature/starter-kit-feature
    ```

3. Working on an Example

Navigate to the relevant example (e.g., kit-nextjs-article-starter) and start the dev server:

💡 Make sure to populate the required environment variables in your .env.local file to connect to your XM Cloud instance.

      cd examples/kit-nextjs-article-starter
      npm install
      npm run dev

4. 💡 Coding Guidelines
  - Follow existing file structure, patterns, and naming conventions.

  - Prefer functional components and modern TypeScript best practices.

  - Keep code modular and components small.

  - Reuse existing utilities and scripts when possible.

## 🤖 AI-Assisted Development

This repository includes comprehensive AI coding agent guidance files to help maintain consistent code quality and follow Sitecore XM Cloud best practices across multiple AI assistants.

### Claude Code Guide

The repository includes **`CLAUDE.md`** - a comprehensive guide for Claude Code and AI assistants:
- Project architecture and technology stack
- Coding standards with TypeScript and modular layout
- Security and performance guidelines
- Component development patterns with examples
- Safe destructuring and data validation patterns
- Sitecore Content SDK import guidelines
- Example prompts and common patterns reference

### Cursor AI Rules

The repository contains `.cursor/rules/` directory with AI guidance files:

- **Core Rules** (always applied):
  - `general.mdc` - Universal coding principles and architecture patterns
  - `code-style.mdc` - Vibe-coding principles and quality standards
  - `project-context.mdc` - Repository-specific context and multi-starter architecture

- **Scoped Rules** (applied to specific files):
  - `javascript.mdc` - JavaScript/TypeScript naming conventions and performance patterns
  - `sitecore.mdc` - Sitecore XM Cloud development patterns and component guidelines
  - `nextjs.mdc` - Next.js specific patterns, routing, and API development
  - `testing.mdc` - Testing strategies for XM Cloud components and integrations

### Windsurf IDE Rules

The repository includes a **`.windsurfrules`** file for Windsurf's agentic IDE workflows:

- **Comprehensive Standards** - Consolidated rules covering:
  - Project overview with multi-starter architecture
  - TypeScript strict mode and naming conventions
  - Complete folder structure with examples
  - Best practices (RO-RO pattern, functional components, immutability)
  - Tailwind CSS styling and Shadcn/ui integration
  - XM Cloud data handling with Zod validation and readonly types
  - Testing patterns with Jest/Playwright and coverage expectations
  - Safety rules and development workflow

### GitHub Copilot Support

The repository includes dedicated GitHub Copilot guidance files:

- **`copilot-instructions.md`** - Comprehensive GitHub Copilot instructions covering:
  - Project overview and repository structure
  - Technology stack and coding standards
  - Sitecore component development patterns
  - Safe field handling and editing mode support
  - Content SDK import guidelines
  - Styling and UI patterns with examples

- **`LLMs.txt`** - Concise LLM guidance file containing:
  - Core architecture principles
  - Code quality standards
  - Security and accessibility requirements
  - Performance optimization guidelines
  - Multi-starter context and safety rules

### Using AI Assistance

When using AI coding assistants:

**Claude Code:**
- Reference `CLAUDE.md` for comprehensive project architecture and coding standards
- Follow the Locality of Behavior pattern for component development
- Use safe destructuring patterns and proper data validation
- Refer to example prompts and common patterns for guidance

**Cursor AI:**
- Rules automatically provide context based on the files you're working with
- Follow the naming conventions and architectural guidance provided
- Refer to the rules when uncertain about XM Cloud implementation approaches

**Windsurf IDE:**
- The `.windsurfrules` file provides comprehensive coding standards and patterns
- Optimized for multi-line autocompletion with full context awareness
- Enables chat-based code navigation with architectural guidance
- Supports agentic workflows with XM Cloud-specific component patterns

**GitHub Copilot:**
- Reference `copilot-instructions.md` for detailed development patterns
- Use `LLMs.txt` for quick context about project standards
- Follow the component development workflow and safety guidelines

**All AI Assistants:**
- All starter applications inherit these rules for consistent development
- Focus on TypeScript-first development with strict mode
- Always validate Sitecore datasource existence
- Implement proper error handling and accessibility features
- When updating standards, propagate changes to all AI guidance files (Claude, Cursor, Windsurf, Copilot)

### Contributing to AI Guidance

To improve the AI guidance files:

**For Claude Code Guide:**
1. Edit `CLAUDE.md` for comprehensive project guidance
2. Include complete examples with TypeScript interfaces and implementations
3. Add example prompts that demonstrate Claude Code usage
4. Ensure all code examples follow the project's coding standards

**For Cursor Rules:**
1. Edit the relevant `.mdc` files in `.cursor/rules/`
2. Keep rules under 500 lines and focused on specific concerns
3. Include concrete examples and file references using `@filepath` syntax

**For Windsurf IDE:**
1. Update `.windsurfrules` for comprehensive standards and patterns
2. Organize content into clear sections (Overview, Standards, Structure, Best Practices, etc.)
3. Include code examples demonstrating proper XM Cloud patterns
4. Keep synchronized with Cursor rules and Copilot instructions

**For GitHub Copilot:**
1. Update `copilot-instructions.md` for detailed patterns and examples
2. Update `LLMs.txt` for concise guidance and quick reference
3. Ensure consistency between all AI guidance files

**General Guidelines:**
4. Test changes with AI coding assistants to ensure effectiveness
5. Consider impact across all starter applications
6. Keep guidance files synchronized with actual codebase patterns
7. When updating standards, propagate changes to all AI guidance files (Cursor, Windsurf, Copilot)

5. 🚀 Submitting a Pull Request
Once your changes are ready:
Make sure your branch is up-to-date with upstream/main and create your PR against the **dmz** branch.

    ✅ Before submitting:
      - Run code formatters or linters if configured.
      - Remove unused code and files.
      - Rebase or squash commits into a clean history.

6. Your PR should include:
  - A clear and descriptive title
  - A summary of the changes and the reason for them
  - Screenshots or logs (if applicable)
  - Manual testing steps taken to verify functionality

7. Code Review Process
  - A maintainer will review your PR and may request changes
  - Address any feedback and update your PR
  - Once approved, your changes will be merged
