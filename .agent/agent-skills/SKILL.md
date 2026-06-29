---
name: agent-skills
description: Skill to configure and manage AI agent settings for Antigravity, GitHub Copilot, and Trae IDE.
---

# Agent Skills Configuration

This skill helps you configure and manage the "Agent Skills" and context for various AI-powered IDEs and assistants.

## Supported IDEs / Agents

1. **Antigravity**
   - **Configuration**: Uses the `.agent` directory.
   - **Skills**: defined in `.agent/skills/<skill-name>/SKILL.md` (or `.agent/<skill-name>/SKILL.md` if using flat structure).
   - **Workflows**: defined in `.agent/workflows/*.md`.

2. **Trae IDE**
   - **Configuration**: Supports `.agent` folder structure (similar to Antigravity) and strict "Project Rules".
   - **Rules**: Define global or project-specific rules in the Settings Center or via `.cursorrules` (if supported migration).
   - **Skills**: Can utilize standard `SKILL.md` definitions.

3. **GitHub Copilot**
   - **Configuration**: Uses `.github/copilot-instructions.md`.
   - **Context**: Reads open files and potentially `.github/copilot-guidelines.md`.

## Setup Instructions

### 1. Unified Agent Skills (Antigravity & Trae)
To add a new capability that both Antigravity and Trae can understand:
1. Create a new directory in `.agent/` (e.g., `.agent/my-new-skill`).
2. Add a `SKILL.md` file with YAML frontmatter:
   ```markdown
   ---
   name: my-new-skill
   description: Brief description of what this skill does.
   ---
   # Detailed Instructions
   Step-by-step description...
   ```

### 2. GitHub Copilot Instructions
To ensure GitHub Copilot understands your project standards:
1. Ensure `.github/copilot-instructions.md` exists.
2. You can generate this file based on your `.agent/rules` or `SKILL.md` contents.
3. **Example content** for `.github/copilot-instructions.md`:
   ```markdown
   # specific project rules
   - Use Vue 3 Composition API.
   - Follow Tailwind CSS utility classes.
   ```

## Workflow for Updating Skills
When you add a new pattern or rule (e.g., in `.agent/clone-section`):
1. Update simple summary in `.github/copilot-instructions.md`.
2. Update precise step-by-step in the relevant `.agent/<skill>/SKILL.md`.

## Resources
- **Trae**: Supports loading skills dynamically.
- **Antigravity**: Native support for `.agent` folder.
