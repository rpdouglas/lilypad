# Lily Pad Strategy & Design — AI Assistant Instructions

This file serves as the root system prompt and configuration for the AI assistant in the Lily Pad workspace.

## Core Initialization
You MUST adhere strictly to the initialization rules defined in `docs/prompts/INITIALIZATION.md`. Ensure you understand your role, the tech stack, architectural rules, anti-regression traps, and persona lenses before taking action in the codebase.

## Feature Planning
When asked to build a new feature, you MUST NOT write implementation code immediately. Instead, you MUST follow the planning protocol defined in `docs/prompts/PLANNING.md`. This process entails:
1. Generating a structured plan document.
2. Saving the plan to `docs/plans/[FEATURE_NAME]_PLAN.md`.
3. Waiting for the user to approve the plan before proceeding with any code modifications.