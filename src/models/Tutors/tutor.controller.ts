import { Request, Response } from "express"
import { tutorService } from "./tutor.service";

const createTutorControl = async (req: Request, res: Response) => {
  const teacherData = req.body;
const tutorProfileData = {
    userId : teacherData.userId,
    designation:teacherData.designation,
    degree:teacherData.degree,
    experience:teacherData.experience,
    contact:teacherData.contact,
    address:teacherData.address
}
  try {
    
    const tutorCreateResponse = await tutorService.createTutor(tutorProfileData);
    return res.status(201).send({
      success: true,
      message: "Tutor Created Successfully",
      data: tutorCreateResponse,
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to Create Tutor",
      data: null,
      error,
    });
  }
};

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


const deleteTutorControlle = async(req:Request , res:Response)=>{
    const {tutorId} = req.params;
    if(!tutorId) throw new Error('Invalid or Empty Tutor Id!!');
    try {
        const response = await tutorService.deleteTutorProfile(tutorId as string);
        return res.status(200).send({
            success: true,
            message: 'Tutor Deleted Successfully.',
            data: response
        })
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: 'Internal Servr Error!',
            data: null,
            error
        })
    }

}

const updateTutorController = async(req:Request , res:Response)=>{
    const {tutorId} = req.params
    const upadateTutorData = req.body;
    try {
        const updateResponse = await tutorService.updateTutor(tutorId as string , upadateTutorData);
        return res.status(200).send({
            success: true,
            message: 'Tutor Updated Successfully.',
            data: updateResponse
        })
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: 'Internal Servr Error!',
            data: null,
            error
        })
    }
}


const getOneTutor = async(req:Request, res:Response) =>{
  const userId = req.params.userId;
  if(!userId) return res.status(404).send({success: false, message: "Invalid User Id!"});

  try {
    const tutorProfile = await tutorService.getTutorProfile(userId as string)
    res.status(200).send({
        success: true,
        message: "Tutor Profile retrived.",
        data: tutorProfile
    })
  } catch (error) {
    res.status(401).send({
        success: false,
        message: "Internal Server Error!",
        data: null,
        error
    })
  }

}
export const tutorController = {
createTutorControl,
getAllTutors,
deleteTutorControlle,
updateTutorController,
getOneTutor
}