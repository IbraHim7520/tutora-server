import { Router } from "express";
import { TeacherController } from "./teacher.controller";

const teacherRouter = Router();

teacherRouter.post("/create-tutor", TeacherController.handleCreateTutor)
export default teacherRouter;