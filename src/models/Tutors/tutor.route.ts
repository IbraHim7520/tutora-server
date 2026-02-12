import { Router } from "express";
import { tutorController } from "./tutor.controller";

const tutorRouter = Router()

tutorRouter.post('/tutor/create-tutor' , tutorController.createTutorControl);

export default tutorRouter;