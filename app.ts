import express, { Application } from 'express'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './src/lib/auth'
import cookieParser from "cookie-parser";
import env from './src/configs/env';
import adminRouter from './src/models/ADMIN/admin.route';
import userRouter from './src/models/USER/user.route';
import teacherRouter from './src/models/TEACHER/teacher.route';
const app:Application = express()

const allowOrigin = [
  env.FRONTEN_URL || "http://localhost:3000" || "https://mentorix-pi.vercel.app",
  "http://localhost:3000",
  "https://mentorix-pi.vercel.app"
].filter(Boolean);

app.use(cors({
  origin: (origin , callbakc)=>{
    if(!origin) return callbakc(null)

      const isAllowed = allowOrigin.includes(origin) || /^https:\/\/mentorix-pi.*\.vercel\.app$/.test(origin)
      ||
      /^https:\/\/.*vercel\.app$/.test(origin)

      if(isAllowed){
        callbakc(null , true)
      }else{
        callbakc(new Error(`Origin ${origin} is not allowed by cors`))
      }

  },
  credentials:true,
  methods: ["POST", "GET", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  exposedHeaders: ["Set-Cookie"]
}))

// app.use(
//   cors({
//     origin: [ env.FRONTEN_URL , "http://localhost:3000", "https://mentorix-pi.vercel.app"],
//     credentials: true
//   })
// );
app.use(cookieParser());

//Authentication Routes-------------
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json())


app.use("/api/v1/users", userRouter);
app.use("/api/v1/admins", adminRouter)
app.use("/api/v1/teachers", teacherRouter)
export default app