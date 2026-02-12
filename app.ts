import express, { Application } from 'express'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './src/lib/auth'
const app:Application = express()

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json())


//Authentication Routes-------------
app.all("/api/auth/*splat", toNodeHandler(auth));

export default app