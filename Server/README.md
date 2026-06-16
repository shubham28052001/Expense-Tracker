# Expense Tracker Backend API

This backend powers the Expense Tracker application with user authentication, email verification, password reset, JWT refresh handling, and rate-limited auth endpoints.

## Features

- User registration with hashed passwords
- Email verification flow with verification links
- Resend verification email support
- Forgot password and reset password flow
- JWT access token + refresh token support
- Login history tracking and refresh-token storage
- Rate limiting for sensitive auth endpoints

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
│   └── userController.js
├── middleware/
│   └── rateLimitMiddlware.js
├── modal/
│   └── user.js
├── Route/
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

Base URL: `http://localhost:5000/api/users`

| Method | Endpoint | Description |
|---|---|---|
| POST | /register | Register a new user |
| POST | /login | Login and receive access + refresh tokens |
| POST | /google-login | Login with Google OAuth token |
| GET | /verify-email?token=YOUR_TOKEN | Verify email address |
| POST | /resend-verification | Send another verification email |
| POST | /forgot-password | Request a password reset email |
| POST | /reset-password?token=YOUR_RESET_TOKEN | Reset password using a reset token |
| POST | /refresh-token | Generate a new access token using a refresh token |
| POST | /logout | Revoke one refresh token |
| POST | /logoutAll | Revoke all refresh tokens for the logged-in user |

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

## Notes

- Passwords are hashed before being stored.
- Verification links are generated with JWT and expire after 10 minutes.
- Refresh tokens are stored per device and can be revoked individually or all at once.
- Rate limiting is applied to login, registration, password reset, and resend-email flows for protection.


