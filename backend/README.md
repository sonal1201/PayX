# PayX Backend

A Node.js backend for the PayX payment application built with Express, TypeScript, and MongoDB.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
DATABASE_URL=mongodb://localhost:27017/payx

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 3. MongoDB Setup
Make sure MongoDB is running on your system:

**Local MongoDB:**
- Install MongoDB locally
- Start MongoDB service
- The default connection string will work: `mongodb://localhost:27017/payx`

**MongoDB Atlas (Cloud):**
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Replace the DATABASE_URL with your connection string:
  ```
  DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/payx?retryWrites=true&w=majority
  ```

### 4. Run the Application

**Development mode:**
```bash
npm run dev
```

**Build and run:**
```bash
npm run build
npm start
```

## API Endpoints

- `POST /api/v1/user/register` - Register a new user

## Current Status
- ✅ Server setup with Express
- ✅ MongoDB connection
- ✅ User model and validation
- ✅ User registration endpoint (validation only)
- ❌ Database integration in controllers
- ❌ Password hashing
- ❌ Authentication endpoints
- ❌ Payment functionality 