# Contributing to Checkora

Thank you for your interest in contributing to Checkora! We welcome contributions of all kinds — bug fixes, new features, documentation improvements, and more.

## 🚀 Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/Checkora.git
   cd Checkora
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Start the dev server**:
   ```bash
   npm run dev
   ```

## 📋 Development Guidelines

### Code Style
- Use **TypeScript** for all new files
- Follow the existing naming conventions (PascalCase for components, camelCase for utilities)
- Use functional components with React hooks
- Keep components focused and reusable

### Commit Messages
Use clear, descriptive commit messages:
```
feat: add new bot personality "Shadow Knight"
fix: resolve timer not pausing on game end
docs: update README with new theme screenshots
style: improve mobile responsiveness of Play page
```

### Project Architecture
- **Pages** go in `src/pages/`
- **Shared components** go in `src/components/`
- **State management** uses Zustand stores in `src/store/`
- **Data definitions** (bots, puzzles) go in `src/data/`
- **Styling** uses Tailwind CSS v4 + CSS custom properties in `src/index.css`

## 🐛 Reporting Bugs

When reporting bugs, please include:
1. Steps to reproduce the issue
2. Expected behavior
3. Actual behavior
4. Your OS and Node.js version
5. Screenshots if applicable

## 🔀 Pull Request Process

1. Ensure your code compiles without errors: `npx tsc --noEmit`
2. Test your changes locally with `npm run dev`
3. Verify the production build works: `npm run build`
4. Update the README if your changes affect the user-facing features
5. Submit a pull request with a clear description of your changes

## 📜 Code of Conduct

- Be respectful and constructive in all interactions
- Welcome newcomers and help them get started
- Focus on the technical merits of contributions
- Keep discussions on-topic and professional

## 💡 Ideas for Contributions

- Add new bot personalities with unique playstyles
- Create additional chess puzzles and tactical themes
- Improve accessibility (keyboard navigation, screen reader support)
- Add multiplayer support (local or online)
- Build an opening explorer feature
- Add game export (PGN download)
- Create additional board themes

---

Thank you for helping make Checkora better! ♟
