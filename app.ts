import express, { Application } from 'express'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './src/lib/auth'
import tutorRouter from './src/models/Tutors/tutor.route'
const app:Application = express()

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


//Authentication Routes-------------
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json())


app.use('/api/v1/tutors/', tutorRouter)

export default app