# Lalli - Modern Angular Project Management System

A modern, full-featured project management application built with Angular 20, Nx, PrimeNG, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed on your system:

#### Required Software
- **Node.js**: Version 22.12.0 or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm**: Version 10.x or higher (comes with Node.js)
  - Verify installation: `npm --version`

- **Git**: Latest version
  - Download from [git-scm.com](https://git-scm.com/)

#### Optional but Recommended
- **Visual Studio Code** with extensions:
  - Angular Language Service
  - Nx Console
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter
  - ESLint

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <your-repository-url>
   cd Lalli
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Install Global Dependencies** (if not already installed)
   ```bash
   # Install Angular CLI globally
   npm install -g @angular/cli@20

   # Install Nx CLI globally
   npm install -g nx@21.5.2
   ```

4. **Verify Installation**
   ```bash
   # Check Angular CLI
   ng version

   # Check Nx installation
   nx --version
   ```

### Development Setup

#### Start the Development Server
```bash
# Using Nx
nx serve Lalli

# Alternative using npm
npm start
```

The application will be available at `http://localhost:4200`

#### Build for Production
```bash
# Production build
nx build Lalli

# Alternative using npm
npm run build
```

#### Run Tests
```bash
# Unit tests
nx test Lalli

# E2E tests
nx e2e Lalli-e2e
```

#### Linting and Formatting
```bash
# Run ESLint
nx lint Lalli

# Format code with Prettier
nx format
```

## 🛠 Technology Stack

### Core Framework
- **Angular 20.2.0**: Latest stable version with standalone components
- **TypeScript 5.9.2**: Type safety and modern JS features
- **Nx 21.5.2**: Monorepo tool and build system

### UI & Styling
- **PrimeNG 20.1.2**: Enterprise-grade Angular UI components
- **PrimeIcons 7.0.0**: Icon library for PrimeNG
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **@primeng/themes 20.1.2**: Official PrimeNG themes

### State Management & Services
- **Angular Signals**: For reactive state management
- **RxJS 7.8.0**: For reactive programming and HTTP handling
- **Angular Router**: For navigation and routing

### Development Tools
- **ESLint 9.8.0**: Code linting and quality checks
- **Prettier 2.6.2**: Code formatting
- **Jest 30.0.2**: Unit testing framework
- **TypeScript ESLint 8.40.0**: TypeScript linting rules

## 📂 Project Structure

```
Lalli/
├── src/
│   ├── app/
│   │   ├── core/                    # Core modules (guards, interceptors, layout)
│   │   │   ├── guards/             # Route guards
│   │   │   ├── interceptors/       # HTTP interceptors
│   │   │   └── layout/             # Layout components
│   │   ├── features/               # Feature modules
│   │   │   ├── auth/              # Authentication feature
│   │   │   ├── dashboard/         # Dashboard feature
│   │   │   ├── projects/          # Projects management
│   │   │   ├── team/              # Team management
│   │   │   └── ...
│   │   ├── shared/                # Shared components and services
│   │   │   ├── components/        # Reusable components
│   │   │   ├── services/          # Shared services
│   │   │   ├── models/            # TypeScript interfaces/types
│   │   │   └── utils/             # Utility functions
│   │   └── pages/                 # Page components (public pages)
│   ├── assets/                    # Static assets
│   └── styles/                    # Global styles
├── public/                        # Public assets (Sass themes, images)
├── docs/                          # Project documentation
├── package.json                   # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
├── nx.json                       # Nx workspace configuration
└── README.md                     # This file
```

## 🚦 Available Scripts

```bash
# Development
npm start                 # Start development server
npm run build            # Build for production
npm run build:dev        # Build for development

# Testing
npm test                 # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run e2e              # Run E2E tests

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier

# Nx Commands
npm run nx:graph         # Show dependency graph
npm run nx:affected      # Run affected commands
```

## 🔧 Configuration

### Environment Variables
Create environment files in `src/environments/`:

- `environment.ts` - Development environment
- `environment.prod.ts` - Production environment

Example configuration:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'Lalli Project Manager'
};
```

### Tailwind CSS
Tailwind is configured in `tailwind.config.js`. The configuration includes:
- Custom color palette
- Dark mode support
- PrimeNG integration
- Custom utility classes

### Angular Configuration
Key Angular configurations:
- Standalone components architecture
- Modern Angular features (Signals, Control Flow)
- Strict TypeScript mode
- Path mapping for clean imports

## 🌟 Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Route guards for protected routes
- User session management

### Project Management
- Create, edit, and delete projects
- Project status tracking
- Team assignment
- Progress monitoring

### User Management
- User profiles and settings
- Team member management
- Role assignment
- Activity tracking

### UI/UX Features
- Dark/Light mode toggle
- Responsive design
- Loading states
- Toast notifications
- Confirmation dialogs

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

### Code Style Guidelines
- Follow Angular style guide
- Use TypeScript strict mode
- Write meaningful commit messages
- Add tests for new features
- Document public APIs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**Node Version Conflicts**
```bash
# Use Node Version Manager (nvm)
nvm use 22.12.0
```

**Dependency Issues**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

**Build Errors**
```bash
# Clear Nx cache
nx reset

# Rebuild project
nx build Lalli --verbose
```

### Getting Help

- Check the [Angular documentation](https://angular.dev)
- Visit [Nx documentation](https://nx.dev)
- Review [PrimeNG documentation](https://primeng.org)
- Open an issue in this repository

## 📊 Performance

The application is optimized for performance with:
- Lazy loading for feature modules
- OnPush change detection strategy
- Bundle optimization with Nx
- Tree shaking for minimal bundle size
- Modern Angular 20 optimizations

Current bundle sizes:
- Main bundle: ~1.25 MB (compressed: ~237 KB)
- Lazy chunks: Optimized per feature

### Key Dependencies Versions
- **Angular**: 20.2.0
- **Nx**: 21.5.2
- **PrimeNG**: 20.1.2
- **PrimeIcons**: 7.0.0
- **Tailwind CSS**: 3.4.17
- **TypeScript**: 5.9.2
- **RxJS**: 7.8.0

---

**Happy Coding! 🚀**