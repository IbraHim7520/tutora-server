import { RequestStatus, SessionStatus, UserStatus } from "../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"

const getAllTutors = async()=>{
    return await prisma.tutor.findMany({
        where:{
            status: RequestStatus.APPROVED,
            isBanned: false
        },
        select:{
            id:true,
           experience:true,
           designation:true ,
           user:{
            select:{
                name:true,
                email:true,
                image:true,
            }
           }
        },
        orderBy:{
            createdAt: "desc"
        }
    })
}

const getTutorDetails = async(tutorId:string)=>{
    const isTutor = await prisma.tutor.findUnique({where: {id:tutorId}})
    if(!isTutor){
        throw new Error("Tutor not found")
    }
    const details = await prisma.tutor.findUnique({
        where:{
            id: tutorId,
            isBanned: false,
        },
        include:{
            user:{
                select:{
                    name:true,
                    email:true,
                    image:true,
                    createdAt:true
                }
            },
            tutorSessions:{
                select:{
                    id:true,
                    title:true,
                    fromTime:true,
                    toTime:true,
                    date:true,
                    category:{
                        select:{
                            title:true,
                            id:true
                        }
                    }
                }
            },
            _count:{
                select:{
                    tutorSessions:true
                }
            }
        }
    })
    return details
}

const getAllActiveSessions = async()=>{
    return await prisma.tutorSession.findMany({
        where:{
            status: SessionStatus.CREATED
        },
        include:{
            tutor:{
                select:{
                    user:{
                        select:{
                            id:true,
                            name:true, email:true , image:true
                        }
                    }
                }
            },
            category:{
                select:{
                    title:true,
                    id:true
                }
            }
        },
        orderBy:{
            createdAt: "desc"
        }
    })
}

const getTutorSessionDetails = async(sessionId:string)=>{
    const isSession = await prisma.tutorSession.findUnique({where: {id:sessionId}})
    if(!isSession){
        throw new Error("Session not found")
    }
    const details = await prisma.tutorSession.findUnique({
        where:{
            id: sessionId,
            status: SessionStatus.CREATED
        },
        include:{
            tutor:{
                select:{
                    user:{
                        select:{
                            name:true,
                            email:true,
                            image:true,
                            createdAt:true
                        }
                    }
                }
            }
        }
    })
    return details
}
    
export const UserService = {
    getAllTutors,
    getTutorDetails,
    getAllActiveSessions,
    getTutorSessionDetails
}
