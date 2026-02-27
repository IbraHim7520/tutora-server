import { Router } from "express";
import { verifyRequest } from "../../middlewere/verifyRequest";
import { UserRole } from "../../generated/prisma/enums";
import { reviewController } from "./review.controller";
//    api/v1/ratings
const reviewRouter = Router();

reviewRouter.get('/tutors-reviews', verifyRequest(UserRole.TEACHER), reviewController.getReviewsByTutorSessions )

export default reviewRouter;