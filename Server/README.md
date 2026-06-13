# Expense Tracker Backend API

This is the Node.js + Express + MongoDB backend for the Expense Tracker application. It currently supports user authentication, email verification, password reset, and rate-limited auth flows.

## Features

- User registration with password hashing
- User login with JWT token generation
- Email verification flow
- Resend verification email
- Forgot password and reset password flow
- Rate limiting for login, registration, password recovery, and resend-email requests

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (jsonwebtoken)
- bcryptjs
- nodemailer
- express-validator
- express-rate-limit

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

3. Create a .env file with the following values
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_VERIFICATION_SECRET=your_email_verification_secret
   BACKEND_URL=http://localhost:5000
   MAIL_USER=your_gmail_address
   MAIL_PASS=your_gmail_app_password
   ```

4. Start the server
   ```bash
   npm start
   ```

## API Endpoints

### 1. Register User
POST /api/users/register

Request body:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "12345678"
}
```

### 2. Login User
POST /api/users/login

Request body:
```json
{
  "email": "john@example.com",
  "password": "12345678"
}
```

### 3. Verify Email
GET /api/users/verify-email?token=YOUR_TOKEN

### 4. Resend Verification Email
POST /api/users/resend-verification

Request body:
```json
{
  "email": "john@example.com"
}
```

### 5. Forgot Password
POST /api/users/forgot-password

Request body:
```json
{
  "email": "john@example.com"
}
```

### 6. Reset Password
POST /api/users/reset-password?token=YOUR_RESET_TOKEN

Request body:
```json
{
  "newPassword": "newStrongPassword123"
}
```

## Example Request

```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "12345678"
  }'
```

## Notes

- Passwords are hashed before saving.
- Verification email links are generated using JWT.
- Rate limiting is applied to sensitive auth endpoints for protection.
- The default server URL is http://localhost:5000.


