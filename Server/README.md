# 💰 Expense Tracker Backend API

A robust backend for the Expense Tracker application built with **Node.js, Express, and MongoDB**.
It supports user registration, authentication, and future expense-management features.

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv
- bcrypt.js

---

## 📁 Project Structure

Server/
├── config/
│   └── db.js
├── Controller/
│   └── userController.js
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

---

## ⚙️ Installation

1. Clone the repository
   ```bash
   git clone https://github.com/shubham28052001/Expense-Tracker.git
   cd Expense-Tracker/Server
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the server
   ```bash
   npm start
   ```

---

## 📌 API Example

### Register a User

**Endpoint**
```http
POST /api/users/register
```

**Request Body**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "12345678"
}
```

**Example using cURL**
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "12345678"
  }'
```

**Success Response**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isVerified": false,
    "createdAt": "2026-06-12T10:00:00.000Z",
    "updatedAt": "2026-06-12T10:00:00.000Z"
  }
}
```

---

## ✅ Notes

- Passwords are hashed before saving.
- Email duplication is checked during registration.
- The server runs on `http://localhost:5000` by default.


