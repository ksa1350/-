# Menu Builder SaaS

A full-stack application scaffold for building a modern menu management SaaS platform. The stack includes a React (Vite) + Tailwind CSS frontend and a Node.js + Express backend powered by PostgreSQL and JWT authentication.

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

### Backend
1. Navigate to the backend package:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```
2. Update the `.env` file with your database credentials and JWT secret.
3. Run the database schema script to create tables:
   ```bash
   psql "$DATABASE_URL" -f src/db/schema.sql
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend
1. Navigate to the frontend package:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. The Vite dev server proxies API requests to `http://localhost:5000` by default.

## Project Structure
```
frontend/   # React + Vite client application
backend/    # Express REST API with PostgreSQL
```

## Available Scripts

### Backend
- `npm run dev` – Start the API with hot reload (nodemon).
- `npm start` – Start the API in production mode.
- `npm run lint` – Lint backend source files.

### Frontend
- `npm run dev` – Start the Vite development server.
- `npm run build` – Build the production bundle.
- `npm run preview` – Preview the production build locally.
- `npm run lint` – Lint frontend source files.

## Environment Variables
Refer to `backend/.env.example` for required backend environment variables. Frontend uses the Vite proxy configuration for API requests during development.

## License
This project is provided as-is for educational and scaffolding purposes.
