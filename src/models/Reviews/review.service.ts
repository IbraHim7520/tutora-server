import { prisma } from "../../lib/prisma"
import { ICreateReview } from "../../Types/interface"

const getTutorSessionReviews = async(tutorEmail:string)=>{
    return await prisma.review.findMany({
        where:{
            tutorSession:{
                tutor:{
                    user:{
                        email: tutorEmail
                    }
                }
            }
        },
        
        include:{
            user:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            },
            tutorSession:{
                select:{
                    id:true,
                    title:true,
                    createdAt:true
                }
            }
        }
    })
}
const postAReview = async(payload:ICreateReview)=>{
    return await prisma.review.create({
        data:{
            rating: payload.rating,
            comment: payload.comment,
            userId: payload.userId,
            tutorSessionId: payload.tutorSessionId
        }
    })
}

const getAllMyReviews = async(userId:string)=>{
    console.log(userId)
    return await prisma.review.findMany({
        where: {
            userId: userId
        },
        include:{
            tutorSession:{
                select:{
                    title:true
                }
            }
        }
    })
}
export const reviewService = {
    getTutorSessionReviews,
    postAReview,
    getAllMyReviews
    

}