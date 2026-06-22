# Expense Tracker Frontend

A modern React application built with Vite for managing personal expenses with user authentication, email verification, and a comprehensive dashboard.

## Features

- User authentication (login, register, password reset)
- Email verification and resend verification email
- Forgot password and reset password flows
- Protected routes and dashboard access
- Responsive design with modern UI/UX
- Real-time API integration with backend
- JWT token-based authentication
- Form validation and error handling

## Tech Stack

- React 18+
- Vite (build tool)
- React Router (routing)
- Axios (API client)
- Context API (state management)
- CSS (styling)
- ESLint (code quality)

## Project Structure

```
Client/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   ├── landing/         # Landing page components
│   │   │   ├── Banner.jsx
│   │   │   ├── CTA.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Stats.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── Working.jsx
│   │   └── layout/          # Layout components
│   │       ├── Navbar.jsx
│   │       └── Footer.jsx
│   ├── context/             # React Context providers
│   │   ├── AuthProvider.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── PublicRoute.jsx
│   ├── pages/               # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Landing.jsx
│   │   └── auth/
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       ├── ForgotPassword.jsx
│   │       ├── ResetPassword.jsx
│   │       ├── VerifyEmail.jsx
│   │       └── ResendEmail.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx    # Route configuration
│   ├── services/
│   │   ├── api.js           # Axios API instance
│   │   └── authService.js   # Auth API calls
│   ├── utils/
│   │   └── validation.js    # Form validation utilities
│   ├── assets/              # Static assets
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/                  # Public assets
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Installation

1. Navigate to the client folder
   ```bash
   cd Client
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file with the following values
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=Expense Tracker
   ```

## Available Scripts

### Development Server
```bash
npm run dev
```
Starts the Vite development server with HMR (Hot Module Replacement).

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing.

### Lint Code
```bash
npm run lint
```
Runs ESLint to check code quality and style.

## Configuration

### Vite Config
The `vite.config.js` file includes React plugin configuration with HMR support.

### ESLint
ESLint is configured in `eslint.config.js` to maintain code quality standards.

## Getting Started

1. Start the backend server (see Server/README.md)
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser and navigate to `http://localhost:5173`

## Authentication Flow

1. **Register**: Create a new account with email and password
2. **Email Verification**: Verify email address via verification link
3. **Login**: Log in with credentials to receive JWT tokens
4. **Protected Routes**: Access dashboard and other protected pages
5. **Password Recovery**: Use forgot password to reset your password
6. **Token Refresh**: Automatically refresh access tokens

## API Integration

The frontend communicates with the backend API through:
- **Base URL**: Configured in `.env` file
- **Authentication**: JWT tokens stored in local storage
- **Error Handling**: Global error handling for API responses
- **Axios Interceptors**: Automatic token attachment to requests

## Features Details

### Pages
- **Landing**: Marketing landing page with features and testimonials
- **Dashboard**: Main user dashboard for expense management
- **Authentication**: Register, login, password reset, email verification flows

### Protected Routes
Routes are protected using context-based authentication:
- Users must be logged in to access the dashboard
- Unauthenticated users are redirected to login

### Form Validation
Form inputs are validated using utility functions for:
- Email format validation
- Password strength validation
- Required field validation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

