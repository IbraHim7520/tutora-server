import { Request, Response } from "express";
import { teachingSessionService } from "./tsesion.service";

// ✅ Create Session
const createSession = async (req: Request, res: Response) => {
  try {
    const result = await teachingSessionService.createSession(req.body);

    res.status(201).json({
      success: true,
      message: "Teaching session created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        message: "Internal Server Error!",
        data: null,
        error
    })
  }
};


const updateSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const updateSessionData = req.body
    const result = await teachingSessionService.updateSession(sessionId as string, updateSessionData);

    res.status(200).json({
      success: true,
      message: "Teaching session updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
        success: false,
        message: "Internal Server Error!",
        data: null,
        error
    })
  }
};


const deleteSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const result = await teachingSessionService.deleteSession(sessionId as string);

    res.status(200).json({
      success: true,
      message: "Teaching session deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
        success: false,
        message: "Internal Server Error!",
        data: null,
        error
    })
  }
};


const getAllSessions = async (req: Request, res: Response) => {
  try {
    const result = await teachingSessionService.getAllSessions();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).send({
        success: false,
        message: "Internal Server Error!",
        data: null,
        error
    })
  }
};

const getSessionById = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const result = await teachingSessionService.getSessionById(sessionId as string);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
   res.status(500).send({
        success: false,
        message: "Internal Server Error!",
        data: null,
        error
    })
  }
};
const getSessionsByTeacherId = async(req:Request , res:Response)=>{
  const tutoremail = req.user?.email;
  try {
    const tutorsSessionsdata = await teachingSessionService.getSessionsByTutorId(tutoremail as string);
    if(tutorsSessionsdata.length > 0){
      res.status(200).send({
        success:true,
        message: "Sessions retrived successfully!",
        data: tutorsSessionsdata
      })
    }else{
      res.status(200).send({
        success:false,
        message: "No Session available yet!",
        data: []
      })
    }
  } catch (error) {
    res.status(401).send({
        success:false,
        message: "Internal server error!",
        data: null,
        error
      })
  }
}

export const teachingSessionController = {
  createSession,
  updateSession,
  deleteSession,   
  getAllSessions,
  getSessionById,
  getSessionsByTeacherId
};
