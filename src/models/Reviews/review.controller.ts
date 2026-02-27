import { Request, Response } from "express";
import { reviewService } from "./review.service";

const getReviewsByTutorSessions = async(req:Request , res:Response)=>{
    const tutorEmail = req.user?.email;
    try {
        const reviews = await reviewService.getTutorSessionReviews(tutorEmail as string);
    return res.status(201).json({
      success: true,
      message: "Review retrived success!",
      data: reviews,
    });
    } catch (error) {
      return res.status(201).json({
      success: false,
      message: "Internal server error!",
      data: null,
      error
    });
    }
}

export const reviewController = {
    getReviewsByTutorSessions
}