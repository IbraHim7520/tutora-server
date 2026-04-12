import { Request, Response } from "express"
import { TeacherService } from "./teacher.service"

const handleCreateTutor = async(req:Request , res:Response)=>{
    try {
        const data =  req.body 
        const result = await TeacherService.createTutorProfile(data)
        res.status(200).json({
            success:true,
            message:"Request Submitted. Please wait for approval.",
            data:result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to create tutor profile",
            error:error
        })
    }

}
export const TeacherController = {
    handleCreateTutor
}
