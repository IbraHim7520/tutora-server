import { Router } from "express";
import { tutorController } from "./tutor.controller";
import { UserRole } from "../../generated/prisma/enums";
import { verifyRequest } from "../../middlewere/verifyRequest";

const tutorRouter = Router()

tutorRouter.post('/tutor/create-tutor' ,verifyRequest(UserRole.TEACHER) ,tutorController.createTutorControl);
tutorRouter.get('/tutor/all-tutors', tutorController.getAllTutors);
tutorRouter.delete('/tutor/delete-tutor/:tutorId' , verifyRequest(UserRole.ADMIN) ,tutorController.deleteTutorControlle)
tutorRouter.patch('/tutor/update-tutor/:tutorId' ,verifyRequest(UserRole.ADMIN, UserRole.TEACHER) , tutorController.updateTutorController)

export default tutorRouter;