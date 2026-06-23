# Expense Tracker Backend API

A comprehensive backend for the Expense Tracker application with user authentication, email verification, password reset, JWT refresh handling, rate-limited auth endpoints, account management, transaction tracking, budget management, and AI-powered financial insights.

## Features

- **User Authentication**
  - User registration with hashed passwords
  - Email verification flow with verification links
  - Resend verification email support
  - Forgot password and reset password flow
  - JWT access token + refresh token support
  - Login history tracking and refresh-token storage
  - Google OAuth integration
  - Rate limiting for sensitive auth endpoints

- **Account Management**
  - Create multiple accounts (bank accounts, wallets, etc.)
  - Account listing and retrieval
  - Update account details
  - Soft-delete accounts
  - Switch active account functionality

- **Transaction Management**
  - Create income and expense transactions
  - View all transactions with filters
  - Update transaction details
  - Delete transactions (soft delete)
  - Recurring transaction support (daily, weekly, monthly, yearly)
  - Transaction categorization
  - Dashboard summary with income/expense totals

- **Budget Management**
  - Create budgets by category and time period
  - Track budget usage and spending
  - Alert thresholds for budget overruns
  - Update and delete budgets

- **AI-Powered Insights**
  - Gemini API integration for financial recommendations
  - Smart expense categorization suggestions

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs
- **Email**: Nodemailer for transactional emails
- **Validation**: express-validator
- **Rate Limiting**: express-rate-limit
- **AI Integration**: Google Gemini API
- **Configuration**: dotenv for environment variables

## Project Structure

```
Server/
├── config/
│   ├── db.js                 # MongoDB connection
│   └── mail.js               # Email configuration
├── Controller/
│   ├── GeminiController.js   # AI insights controller
│   ├── accountController.js  # Account management
│   ├── BudgetController.js   # Budget management
│   ├── transactionController.js # Transaction handling
│   └── userController.js     # User authentication
├── middleware/
│   ├── authmiddlware.js      # JWT authentication
│   └── rateLimitMiddlware.js # Rate limiting
├── modal/
│   ├── AccountModel.js       # Account schema
│   ├── BudgetModel.js        # Budget schema
│   ├── transactionModel.js   # Transaction schema
│   └── user.js               # User schema
├── Route/
│   ├── accountRoute.js       # Account routes
│   ├── budgetRoute.js        # Budget routes
│   ├── transactionRoute.js   # Transaction routes
│   └── userRoute.js          # User authentication routes
├── utills/
│   ├── bcrypt.js             # Password hashing utilities
│   ├── Gemini.js             # Gemini API wrapper
│   ├── jwt.js                # JWT utilities
│   ├── Status.js             # HTTP status responses
│   └── Validator.js          # Input validation
├── server.js                 # Express server setup
└── package.json              # Dependencies
```

## Installation

1. Navigate to the Server folder
   ```bash
   cd Server
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the Server root directory with the following values:
   ```env
   # Server Configuration
   PORT=5000
   
   # Database Configuration
   MONGO_URI=your_mongodb_connection_string
   
   # JWT Configuration
   JWT_SECRET=your_access_token_secret
   JWT_EXPIRE_IN=1h
   JWT_REFRESH_SECRET=your_refresh_token_secret
   JWT_REFRESH_EXPIRE_IN=7d
   
   # Application URLs
   BACKEND_URL=http://localhost:5000
   FRONTEND_URL=http://localhost:5173
   
   # Email Configuration
   MAIL_USER=your_gmail_address
   MAIL_PASS=your_gmail_app_password
   
   # Gemini API Configuration
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the server
   ```bash
   npm start
   ```

The server will be available at `http://localhost:5000`

## API Endpoints

All endpoints (except `/register` and `/login`) require a valid JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

### User Authentication
Base URL: `http://localhost:5000/api/users`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | /register | No | Register a new user |
| POST | /login | No | Login and receive access + refresh tokens |
| POST | /google-login | No | Login with Google OAuth token |
| GET | /verify-email?token=TOKEN | No | Verify email address |
| POST | /resend-verification | No | Send another verification email |
| POST | /forgot-password | No | Request a password reset email |
| POST | /reset-password | No | Reset password using a reset token |
| POST | /refresh-token | No | Generate a new access token using a refresh token |
| POST | /logout | Yes | Revoke one refresh token |
| POST | /logoutAll | Yes | Revoke all refresh tokens for the logged-in user |
| GET | /profile | Yes | Get user profile |
| POST | /chat | Yes | Get AI insights from Gemini |

### Account Management
Base URL: `http://localhost:5000/api/account`

All endpoints require authentication.

| Method | Endpoint | Description |
|---|---|---|
| POST | /create | Create a new account |
| GET | /getAllaccount | Get all accounts for the logged-in user |
| GET | /getaccount/:id | Get a specific account by ID |
| PUT | /updateAccount/:id | Update an account (name, type, initialBalance) |
| DELETE | /deleteAccount/:id | Soft-delete an account |
| PATCH | /toggle/:id | Switch the active account |

### Transaction Management
Base URL: `http://localhost:5000/api/transaction`

All endpoints require authentication.

| Method | Endpoint | Description |
|---|---|---|
| POST | /create | Create a new transaction (income or expense) |
| GET | /transactions | Get all transactions (supports filters) |
| GET | /transactions/:id | Get a specific transaction by ID |
| PUT | /update/:id | Update a transaction |
| DELETE | /delete/:id | Delete a transaction (soft delete) |
| GET | /summary/:accountId | Get dashboard summary (income, expense, balance) |
| GET | /getRecent/:accountId | Get 5 most recent transactions |

**Query Parameters for `/transactions`:**
- `type` - Filter by type (INCOME, EXPENSE)
- `accountId` - Filter by account ID

### Budget Management
Base URL: `http://localhost:5000/api/budget`

All endpoints require authentication.

| Method | Endpoint | Description |
|---|---|---|
| POST | /create | Create a new budget |
| GET | /getAllBudgets | Get all budgets for the logged-in user |
| GET | /getBudget/:id | Get a specific budget by ID |
| PUT | /updateBudget/:id | Update a budget |
| DELETE | /deleteBudget/:id | Delete a budget (soft delete) |
| GET | /getBudgetUsage/:id | Get budget usage details |

## Request/Response Examples

### User Registration
**Request:**
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully. Please verify your email.",
  "data": {
    "_id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```

### User Login
**Request:**
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "user_id",
      "fullName": "John Doe",
      "email": "john@example.com"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Create Account
**Request:**
```bash
curl -X POST http://localhost:5000/api/account/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Savings Account",
    "type": "savings",
    "initialBalance": 5000
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "_id": "account_id",
    "name": "Savings Account",
    "type": "savings",
    "initialBalance": 5000,
    "isActive": true
  }
}
```

### Create Transaction
**Request:**
```bash
curl -X POST http://localhost:5000/api/transaction/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "accountId": "account_id",
    "type": "EXPENSE",
    "amount": 150,
    "category": "groceries",
    "description": "Weekly grocery shopping",
    "date": "2026-06-23",
    "isRecurring": false
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Transaction created successfully",
  "data": {
    "_id": "transaction_id",
    "accountId": "account_id",
    "type": "EXPENSE",
    "amount": 150,
    "category": "groceries",
    "description": "Weekly grocery shopping",
    "date": "2026-06-23",
    "isRecurring": false
  }
}
```

### Create Budget
**Request:**
```bash
curl -X POST http://localhost:5000/api/budget/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "accountId": "account_id",
    "category": "groceries",
    "amount": 500,
    "month": 6,
    "year": 2026,
    "alertPercentage": 80
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Budget created successfully",
  "data": {
    "_id": "budget_id",
    "accountId": "account_id",
    "category": "groceries",
    "amount": 500,
    "month": 6,
    "year": 2026,
    "alertPercentage": 80,
    "isActive": true
  }
}
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

**Common Error Codes:**
- `400` - Bad Request (invalid input data)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (resource already exists)
- `500` - Server Error (internal server error)

## Rate Limiting

The following endpoints are rate-limited to prevent abuse:

- `/api/users/register` - 5 requests per 15 minutes
- `/api/users/login` - 10 requests per 15 minutes
- `/api/users/forgot-password` - 3 requests per hour
- `/api/users/resend-verification` - 3 requests per hour

Response when rate limit exceeded:
```json
{
  "success": false,
  "message": "Too many requests. Please try again later."
}
```

## Complete Route Reference

### User Routes (`/api/users`)
| Method | Path | Middleware | Description |
|---|---|---|---|
| POST | /register | `registerValidation`, `registerLimiter` | Register a new user (5 req/15 min) |
| POST | /login | `loginValidation`, `loginLimiter` | User login (10 req/15 min) |
| POST | /google-login | - | Google OAuth login |
| GET | /verify-email | - | Verify email with token |
| POST | /resend-verification | `resendEmailLimiter` | Resend verification email (3 req/hour) |
| POST | /forgot-password | `forgotPasswordValidation`, `forgotPasswordLimiter` | Request password reset (3 req/hour) |
| POST | /reset-password | `resetPasswordValidation`, `resetPasswordLimiter` | Reset password with token |
| POST | /refresh-token | `refreshLimiter` | Generate new access token |
| POST | /logout | - | Logout and revoke refresh token |
| POST | /logoutAll | `authMiddleware` | Logout from all devices |
| GET | /profile | `authMiddleware` | Get user profile |
| POST | /chat | - | Chat with Gemini AI |

### Account Routes (`/api/account`)
| Method | Path | Middleware | Controller Method | Description |
|---|---|---|---|---|
| POST | /create | `authMiddleware` | createAccount | Create new account |
| GET | /getAllaccount | `authMiddleware` | getAllaccount | Get all user accounts |
| GET | /getaccount/:id | `authMiddleware` | getAccount | Get specific account |
| PUT | /updateAccount/:id | `authMiddleware` | updateAccount | Update account details |
| DELETE | /deleteAccount/:id | `authMiddleware` | DeleteAccount | Delete (soft-delete) account |
| PATCH | /toggle/:id | `authMiddleware` | switchActiveAccount | Switch active account |

### Transaction Routes (`/api/transaction`)
| Method | Path | Middleware | Controller Method | Description |
|---|---|---|---|---|
| POST | /create | `authmiddlware` | createTransaction | Create new transaction |
| GET | /transactions | `authmiddlware` | alltransactions | Get all transactions (with filters) |
| GET | /transactions/:id | `authmiddlware` | getTransaction | Get specific transaction |
| PUT | /update/:id | `authmiddlware` | updateTransaction | Update transaction |
| DELETE | /delete/:id | `authmiddlware` | deleteTransaction | Delete (soft-delete) transaction |
| GET | /summary/:accountId | `authmiddlware` | getDashboardSummary | Get dashboard summary |
| GET | /getRecent/:accountId | `authmiddlware` | getRecentTransaction | Get 5 recent transactions |

### Budget Routes (`/api/budget`)
| Method | Path | Middleware | Controller Method | Description |
|---|---|---|---|---|
| POST | /create | `authmiddlware` | createBudget | Create new budget |
| GET | /getAllBudgets | `authmiddlware` | getAllBudgets | Get all budgets |
| GET | /getBudget/:id | `authmiddlware` | getBudget | Get specific budget |
| PUT | /updateBudget/:id | `authmiddlware` | updateBudget | Update budget |
| DELETE | /deleteBudget/:id | `authmiddlware` | deleteBudget | Delete (soft-delete) budget |
| GET | /getBudgetUsage/:id | `authmiddlware` | getBudgetUsage | Get budget usage details |

## Middleware Overview

| Middleware | Purpose | Location |
|---|---|---|
| `authMiddleware` | Verify JWT token and user authentication | `/middleware/authmiddlware.js` |
| `registerLimiter` | Rate limit registration (5 req/15 min) | `/middleware/rateLimitMiddlware.js` |
| `loginLimiter` | Rate limit login attempts (10 req/15 min) | `/middleware/rateLimitMiddlware.js` |
| `registerLimiter` | Rate limit registration (5 req/15 min) | `/middleware/rateLimitMiddlware.js` |
| `resendEmailLimiter` | Rate limit resend email (3 req/hour) | `/middleware/rateLimitMiddlware.js` |
| `forgotPasswordLimiter` | Rate limit forgot password (3 req/hour) | `/middleware/rateLimitMiddlware.js` |
| `resetPasswordLimiter` | Rate limit password reset attempts | `/middleware/rateLimitMiddlware.js` |
| `refreshLimiter` | Rate limit token refresh | `/middleware/rateLimitMiddlware.js` |
| `registerValidation` | Validate registration input | `/utills/Validator.js` |
| `loginValidation` | Validate login input | `/utills/Validator.js` |
| `forgotPasswordValidation` | Validate forgot password input | `/utills/Validator.js` |
| `resetPasswordValidation` | Validate password reset input | `/utills/Validator.js` |

## Important Notes

- **Password Security**: All passwords are hashed using bcryptjs before storage
- **Email Verification**: Verification links are generated with JWT and expire after 10 minutes
- **Token Management**: Refresh tokens are stored per device and can be revoked individually or all at once
- **Soft Deletes**: Accounts, transactions, and budgets use soft-delete (marked as deleted, not removed)
- **Data Isolation**: All user data is isolated by userId for security
- **Transaction Types**: Only "INCOME" and "EXPENSE" are valid transaction types
- **Recurring Transactions**: Support for daily, weekly, monthly, and yearly recurring intervals
- **Budget Alerts**: Customizable alert thresholds (1-100%) for budget monitoring
- **CORS Configuration**: Backend accepts requests from `http://localhost:5173` (frontend)

## Troubleshooting

**Database Connection Error**
- Verify MongoDB URI in `.env` file
- Ensure MongoDB instance is running
- Check network connectivity to MongoDB server

**Email Verification Not Working**
- Confirm Gmail credentials and app password in `.env`
- Ensure 2-factor authentication is enabled for Gmail
- Check spam folder for verification emails

**JWT Token Expired**
- Use the refresh token endpoint to get a new access token
- Ensure JWT_SECRET and JWT_REFRESH_SECRET are set correctly

**CORS Issues**
- Verify frontend URL matches `origin` in CORS configuration
- Check that credentials are properly set

## Future Enhancements

- Multi-currency support
- Expense analytics and reports
- Budget notifications via email/SMS
- Export transaction data (CSV/PDF)
- Mobile app authentication
- Two-factor authentication (2FA)
- Transaction receipt attachments

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support, email support@expensetracker.com or open an issue in the repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

