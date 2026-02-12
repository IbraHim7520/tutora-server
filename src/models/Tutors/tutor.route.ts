import { Router } from "express";
import { tutorController } from "./tutor.controller";

const tutorRouter = Router()

tutorRouter.post('/tutor/create-tutor' , tutorController.createTutorControl);
tutorRouter.get('/tutor/all-tutors', tutorController.getAllTutors);


export default tutorRouter;