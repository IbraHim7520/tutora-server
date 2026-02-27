import { prisma } from "../../lib/prisma"

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

export const reviewService = {
    getTutorSessionReviews
}