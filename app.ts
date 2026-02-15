import express, { Application } from 'express'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './src/lib/auth'
import cookieParser from "cookie-parser";
import tutorRouter from './src/models/Tutors/tutor.route'
import userRouter from './src/models/Users/user.route';
import catRouter from './src/models/Catgory/cateory.route';
const app:Application = express()

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

//Authentication Routes-------------
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json())


app.use('/api/v1/tutors/', tutorRouter)
app.use('/api/v1/users/', userRouter)
app.use('/api/v1/categories', catRouter);

export default app