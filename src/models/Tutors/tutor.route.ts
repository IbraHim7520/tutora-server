import { Router } from "express";
import { tutorController } from "./tutor.controller";

const tutorRouter = Router()

tutorRouter.post('/tutor/create-tutor' , tutorController.createTutorControl);
tutorRouter.get('/tutor/all-tutors', tutorController.getAllTutors);
tutorRouter.delete('/tutor/delete-tutor/:tutorId' , tutorController.deleteTutorControlle)
tutorRouter.patch('/tutor/update-tutor/:tutorId' , tutorController.updateTutorController)

export default tutorRouter;