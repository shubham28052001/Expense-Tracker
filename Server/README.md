# Expense Tracker Backend API

This backend powers the Expense Tracker application with user authentication, email verification, password reset, JWT refresh handling, rate-limited auth endpoints, and account management.

## Features

- User registration with hashed passwords
- Email verification flow with verification links
- Resend verification email support
- Forgot password and reset password flow
- JWT access token + refresh token support
- Login history tracking and refresh-token storage
- Rate limiting for sensitive auth endpoints
- Account creation, listing, update, delete, and active-account switching

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (jsonwebtoken)
- bcryptjs
- nodemailer
- express-validator
- express-rate-limit
- dotenv

## Project Structure

Server/
├── config/
│   ├── db.js
│   └── mail.js
├── Controller/
│   ├── GeminiController.js
│   ├── accountController.js
│   └── userController.js
├── middleware/
│   ├── authmiddlware.js
│   └── rateLimitMiddlware.js
├── modal/
│   ├── AccountModel.js
│   └── user.js
├── Route/
│   ├── accountRoute.js
│   └── userRoute.js
├── utills/
│   ├── bcrypt.js
│   ├── jwt.js
│   ├── Status.js
│   └── Validator.js
├── server.js
└── package.json

## Installation

1. Go to the server folder
   ```bash
   cd Server
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file with the following values
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_access_token_secret
   JWT_EXPIRE_IN=1h
   JWT_REFRESH_SECRET=your_refresh_token_secret
   JWT_REFRESH_EXPIRE_IN=7d
   BACKEND_URL=http://localhost:5000
   MAIL_USER=your_gmail_address
   MAIL_PASS=your_gmail_app_password
   ```

4. Start the server
   ```bash
   npm start
   ```

## API Endpoints

### User Authentication
Base URL: `http://localhost:5000/api/users`

| Method | Endpoint | Description |
|---|---|---|
| POST | /register | Register a new user |
| POST | /login | Login and receive access + refresh tokens |
| POST | /google-login | Login with Google OAuth token |
| GET | /verify-email?token=YOUR_TOKEN | Verify email address |
| POST | /resend-verification | Send another verification email |
| POST | /forgot-password | Request a password reset email |
| POST | /reset-password | Reset password using a reset token |
| POST | /refresh-token | Generate a new access token using a refresh token |
| POST | /logout | Revoke one refresh token |
| POST | /logoutAll | Revoke all refresh tokens for the logged-in user |
| GET | /profile | Get user profile (requires authentication) |
| POST | /chat | Chat with AI using Gemini API |

### Account Management
Base URL: `http://localhost:5000/api/account`

| Method | Endpoint | Description |
|---|---|---|
| POST | /create | Create a new account |
| GET | /getAllaccount | Get all accounts for the logged-in user |
| GET | /getaccount/:id | Get one account by id |
| PUT | /updateAccount/:id | Update an account's name or type |
| DELETE | /deleteAccount/:id | Soft-delete an account |
| PATCH | /toggle/:id | Switch the active account |

## Example Requests

### Register
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "12345678"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "12345678"
  }'
```

### Google Login
```bash
curl -X POST http://localhost:5000/api/users/google-login \
  -H "Content-Type: application/json" \
  -d '{
    "token": "YOUR_GOOGLE_ID_TOKEN"
  }'
```

### Verify Email
```bash
curl "http://localhost:5000/api/users/verify-email?token=YOUR_TOKEN"
```

### Refresh Token
```bash
curl -X POST http://localhost:5000/api/users/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

### Logout
```bash
curl -X POST http://localhost:5000/api/users/logout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

### Logout All Devices
```bash
curl -X POST http://localhost:5000/api/users/logoutAll \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Get Profile
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Chat with AI
```bash
curl -X POST http://localhost:5000/api/users/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Your query to AI"
  }'
```

### Create Account
```bash
curl -X POST http://localhost:5000/api/account/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "Main Wallet",
    "type": "CURRENT",
    "initialBalance": 1000
  }'
```

### List Accounts
```bash
curl -X GET http://localhost:5000/api/account/getAllaccount \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Get Account by ID
```bash
curl -X GET http://localhost:5000/api/account/getaccount/YOUR_ACCOUNT_ID \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Update Account
```bash
curl -X PUT http://localhost:5000/api/account/updateAccount/YOUR_ACCOUNT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "Savings",
    "type": "SAVING"
  }'
```

### Delete Account
```bash
curl -X DELETE http://localhost:5000/api/account/deleteAccount/YOUR_ACCOUNT_ID \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Switch Active Account
```bash
curl -X PATCH http://localhost:5000/api/account/toggle/YOUR_ACCOUNT_ID \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Notes

- Passwords are hashed before being stored.
- Verification links are generated with JWT and expire after 10 minutes.
- Refresh tokens are stored per device and can be revoked individually or all at once.
- Rate limiting is applied to login, registration, password reset, and resend-email flows for protection.
- Account deletion is soft-delete, and one active account must remain for each user.

