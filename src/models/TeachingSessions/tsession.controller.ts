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
      message: "Teaching session soft-deleted successfully",
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


export const teachingSessionController = {
  createSession,
  updateSession,
  deleteSession,   
  getAllSessions,
  getSessionById,
};
