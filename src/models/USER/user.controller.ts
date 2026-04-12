import { Request, Response } from "express"
import { UserService } from "./user.service"

const getAllTutors = async(req:Request, res:Response)=>{
    try {
        const result = await UserService.getAllTutors()
        res.status(200).json({
            success:true,
            message:"Tutors fetched successfully",
            data:result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to fetch tutors",
            error:error
        })
    }
}

const getTutorDetails = async(req:Request, res:Response)=>{
    try {
        const tutorId = req.params.id as string
        const result = await UserService.getTutorDetails(tutorId)
        res.status(200).json({
            success:true,
            message:"Tutor details fetched successfully",
            data:result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to fetch tutor details",
            error:error
        })
    }
}

const getAllActiveSessions = async(req:Request, res:Response)=>{
    try {
        const result = await UserService.getAllActiveSessions()
        res.status(200).json({
            success:true,
            message:"Sessions fetched successfully",
            data:result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to fetch sessions",
            error:error
        })
    }
}

const getTutorSessionDetails = async(req:Request, res:Response)=>{
    try {
        const sessionId = req.params.id as string
        const result = await UserService.getTutorSessionDetails(sessionId)
        res.status(200).json({
            success:true,
            message:"Session details fetched successfully",
            data:result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to fetch session details",
            error:error
        })
    }
}

export const UserController = {
    getAllTutors,
    getTutorDetails,
    getAllActiveSessions,
    getTutorSessionDetails
}
