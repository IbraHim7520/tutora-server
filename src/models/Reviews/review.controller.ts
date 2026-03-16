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

const createReview = async(req:Request , res:Response)=>{
  const reviewData = req.body
  try {
    const reviewResponse = await reviewService.postAReview(reviewData);

    return res.status(201).send({
      success: true,
      message: "Review Submitted Successfully.",
      data: reviewResponse
    })
  } catch (error) {
    
    return res.status(500).send({
      success: false,
      message: "Failed to submit review!!",
      data: null,
      error
    })
  }
}


const getMyReviews = async(req:Request , res:Response) =>{
  const userId = req.params.userId as string
  try {
    const myReviews = await reviewService.getAllMyReviews(userId);
    return res.status(200).send({
      success: true,
      message: "Review retrived successfully!",
      data: myReviews
    })
  } catch (error) {
     return res.status(500).send({
      success: true,
      message: "Internal Server error",
      data: null,
      error
    })
  }
}

export const reviewController = {
    getReviewsByTutorSessions,
    createReview,
    getMyReviews
}