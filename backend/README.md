# Task Manager Backend API

> Production-quality RESTful API for a Kanban-style Task Management application.  
> Built as part of the **TEYZIX Core Internship - Assignment 1**.

---

## Tech Stack

| Technology   | Purpose                        |
| ------------ | ------------------------------ |
| Node.js      | Runtime environment            |
| Express.js   | Web framework                  |
| MongoDB Atlas| Cloud database                 |
| Mongoose     | MongoDB ODM (Object Modeling)  |
| JWT          | Authentication tokens          |
| bcryptjs     | Password hashing               |
| dotenv       | Environment variable management|
| cors         | Cross-Origin Resource Sharing  |
| nodemon      | Auto-restart on file changes   |

---

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection module
│   ├── controllers/           # Route handler business logic
│   ├── middleware/
│   │   └── errorMiddleware.js # Global error handling
│   ├── models/                # Mongoose schemas
│   ├── routes/                # Express route definitions
│   ├── utils/
│   │   └── asyncHandler.js    # Async error wrapper utility
│   └── server.js              # App entry point
├── .env                       # Environment variables (DO NOT COMMIT)
├── .gitignore
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+
- MongoDB Atlas account (free tier)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd backend

# Install dependencies
npm install

# Create .env file with your credentials
# (see .env.example for required variables)
```

### Running the Server

```bash
# Development (auto-restart with nodemon)
npm run dev

# Production
npm start
```

### Expected Output

```
MongoDB Connected: cluster0-shard-00-xx.bohz4mg.mongodb.net
SERVER STARTED ON PORT 3000
```

---

## API Endpoints

### Health Check

| Method | Endpoint | Description          |
| ------ | -------- | -------------------- |
| GET    | `/`      | API status check     |

### Authentication (Day 2)

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login user        |
| GET    | `/api/auth/profile`  | Get user profile  |

### Tasks (Day 3+)

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| GET    | `/api/tasks`      | Get all tasks      |
| POST   | `/api/tasks`      | Create a task      |
| PUT    | `/api/tasks/:id`  | Update a task      |
| DELETE | `/api/tasks/:id`  | Delete a task      |

---

## Environment Variables

| Variable    | Description                    | Example                     |
| ----------- | ------------------------------ | --------------------------- |
| `NODE_ENV`  | App environment                | `development`               |
| `PORT`      | Server port                    | (dynamic)                   |
| `MONGO_URI` | MongoDB Atlas connection string| `mongodb+srv://...`         |
| `JWT_SECRET`| Secret key for JWT signing     | `your_secret_key_here`      |

---

## License

ISC
