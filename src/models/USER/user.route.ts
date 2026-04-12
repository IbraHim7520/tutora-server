import { Router } from "express";
import { UserController } from "./user.controller";

const userRouter = Router();

//Public Users Routes----------------------
userRouter.get("/all-tutors", UserController.getAllTutors)
userRouter.get("/tutors/:id",UserController.getTutorDetails)
userRouter.get("/all-sessions", UserController.getAllActiveSessions)
userRouter.get("/sessions/:id", UserController.getTutorSessionDetails)




export default userRouter;