# Express.js API Project

This is an **Express.js** API with authentication and messaging functionalities. The project uses **MongoDB** as the database and supports authentication using cookies.

## Features
- User authentication (Login, Signup, Logout)
- Secure cookie-based authentication
- Messaging system
- Environment variable support using **dotenv**

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)
- dotenv (for environment variables)
- cookie-parser (for handling cookies)

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the server:**
   ```sh
   npm start
   ```

## API Routes

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Login a user
- `POST /api/auth/logout` → Logout user

### Message Routes (`/api/message`)
- `POST /api/message` → Send a message
- `GET /api/message` → Get all messages

## Database Connection

The project connects to **MongoDB** using a separate `connectDB` function inside `lib/db.js`. Ensure your **MongoDB URI** is set correctly in the `.env` file.

## Running in Development Mode

For development, use **nodemon**:
```sh
npm run dev
```

## License
This project is licensed under the **MIT License**.

---
### Author
Developed by **Your Name** ([@yourgithub](https://github.com/yourgithub))

