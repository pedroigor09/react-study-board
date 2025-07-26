# Copilot Instructions for React Study Board

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is an educational interactive website that teaches React concepts through animated cards and visual storytelling. The site simulates a whiteboard/blackboard experience where concepts are "drawn" as the user scrolls.

## Key Technologies
- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations and transitions
- **React Intersection Observer** for scroll-triggered animations

## Architecture Guidelines
- Use TypeScript for all components and utilities
- Follow React best practices with custom hooks
- Implement proper component composition and separation of concerns
- Use Tailwind CSS with semantic class naming
- Leverage Framer Motion for smooth, performant animations

## Component Structure
- Keep components small and focused on single responsibilities
- Use custom hooks for complex logic and state management
- Implement proper TypeScript interfaces for all props and data structures
- Follow the established folder structure for organization

## Animation Patterns
- Cards should appear with hand-drawn, sketch-like animations
- Use SVG paths for connecting arrows between concepts
- Implement scroll-triggered animations for progressive revelation
- Maintain 60fps performance for all animations

## Educational Content Focus
The app teaches these React concepts:
- Client-side vs Server-side rendering
- useState and useEffect best practices
- Custom hooks and wrappers
- revalidateTag and caching strategies
- Common pitfalls and solutions

## Code Quality Standards
- Write self-documenting code with clear variable names
- Add JSDoc comments for complex functions
- Implement proper error boundaries and loading states
- Follow accessibility best practices (WCAG 2.1)
- Use semantic HTML and proper ARIA attributes
