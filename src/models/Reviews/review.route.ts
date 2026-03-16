import { Router } from "express";
import { verifyRequest } from "../../middlewere/verifyRequest";
import { UserRole } from "../../generated/prisma/enums";
import { reviewController } from "./review.controller";
//    api/v1/ratings
const reviewRouter = Router();

reviewRouter.get('/tutors-reviews', verifyRequest(UserRole.TEACHER), reviewController.getReviewsByTutorSessions )
reviewRouter.post('/review/create', verifyRequest(UserRole.STUDENT, UserRole.ADMIN , UserRole.TEACHER), reviewController.createReview)
reviewRouter.get('/my/:userId' , verifyRequest(UserRole.STUDENT), reviewController.getMyReviews)

export default reviewRouter;