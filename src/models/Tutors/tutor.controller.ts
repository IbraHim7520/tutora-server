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


const getAllTutors = async(req:Request , res:Response)=>{
    try {
        const result = await tutorService.getALlTutors()
        if(result.length > 0){
            return res.status(200).send({
                success : true,
                message: "Tutor Retrived Successfully.",
                data : result
            })
        }else{
            return res.status(404).send({
                success : true,
                message: "No Tutor Available!!",
                data : result
            })
        }
    } catch (error) {
        return res.status(500).send({
                success : true,
                message: "Internal Server error!!",
                data : null,
                error
        })
    }
}

export const tutorController = {
createTutorControl,
getAllTutors
}