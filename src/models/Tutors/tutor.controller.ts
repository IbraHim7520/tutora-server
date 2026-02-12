import { Request, Response } from "express"
import { tutorService } from "./tutor.service";

const createTutorControl = async(req:Request , res:Response)=>{
    const teacherData = req.body;
    try {
        const response = await tutorService.createTutor(teacherData);
        if(response.user){
            return res.status(201).send({
                success : true,
                message : "Tutor Created Successfully.",
                data: response
            })
        }
    } catch (error:any) {
        return res.status(201).send({
                success : false,
                message : "Failed to Create Tutor!",
                data: null,
                error
        })
    }
}

export const tutorController = {
createTutorControl
}