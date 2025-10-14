# 🔐 Local Authentication (Passport.js)

This project implements **local authentication** using **Passport.js** with **Express** and **PostgreSQL**.  
It allows users to **register**, **log in**, and **log out** securely using session-based authentication.

## ⚙️ Tech Stack

- **Node.js** – Runtime environment  
- **Express.js** – Server framework  
- **Passport.js (Local Strategy)** – Authentication  
- **PostgreSQL** – Database  
- **EJS** – Template engine for views  
- **bcryptjs** – Password hashing  
- **express-session** – Session handling  


## 🧩 Setup & Installation

1. **Navigate into the local strategy folder**
```bash
cd Local-Strategy-Implementation
```

2. **Install Dependancies**
```bash
npm install
```

3. **Setup your PostgreSQL database**
- Create a table named `users`
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);
```

4. **Create a `.env` file**
```env
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_HOST=localhost
SESSION_SECRET=your_secret_key
```

5. **Run the Application**
```bash
npm run dev
```

6. **Visit**
```bash
http://localhost:3000
```

## 🔑 Authentication Flow

### User Registration
- User signs up with a username and password.
- Password is hashed with bcrypt and stored in PostgreSQL.

### User Login
- Passport verifies the username and hashed password.
- If correct, a session is created and stored.

### Session Management
- Passport serializes the user’s ID into the session.
- On subsequent requests, Passport deserializes the user and makes it available as `req.user`.

### Protected Routes
- The middleware `isAuthenticated()` ensures only logged-in users can access certain routes like `/dashboard`.

### Logout
- Ends the session using `req.logout()` and redirects back to the login page.

## 📷 Routes Overview

|Route|Method|Description|
|--------------|--------|---------------------------------|
|`/`|GET|Login page|
|`/register`|GET|Registration page|
|`/register`|POST|Create a new user|
|`/login`|POST|Log in an existing user|
|`/dashboard`|GET|Protected page (requires login)|
|`/logout`|GET|Log out and destroy session|