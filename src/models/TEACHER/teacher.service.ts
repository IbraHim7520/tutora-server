import { prisma } from "../../lib/prisma"
import { ITutorCreateProfile } from "./teacher.interface"

const createTutorProfile = async(payload:ITutorCreateProfile)=>{
    const result = await prisma.tutor.create({
        data:{
            userId:payload.userId,
            designation:payload.designation,
            degree:payload.degree,
            experience:payload.experience,
            contact:payload.contact,
            address:payload.address
        }
    })
    return result
}
export const TeacherService = {
    createTutorProfile
}
