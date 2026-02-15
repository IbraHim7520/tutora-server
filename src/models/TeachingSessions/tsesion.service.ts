import { prisma } from "../../lib/prisma";
import { ITeachingSessionData, ITeachingSessionDataUpdate } from "../../Types/interface";


const createSession = async (data:ITeachingSessionData) => {
    return await prisma.tutorSession.create({
        data:{
            title: data.title,
            description: data.description,
            date: data.date,
            fromTime:data.fromTime,
            toTime: data.toTime,
            tutorId: data.tutorId,
            categoryId: data.categoryId,
            sessionFee: data.sessionFee
        }
    });
};

const updateSession = async (
    sessionId: string,
    updatedData: ITeachingSessionDataUpdate
) => {
    return await prisma.tutorSession.update({
        where: { id: sessionId },
        data : {
            title: updatedData.title,
            description: updatedData.description,
            date: updatedData.date,
            fromTime:updatedData.fromTime,
            toTime: updatedData.toTime,
            tutorId: updatedData.tutorId,
            categoryId: updatedData.categoryId,
            sessionFee: updatedData.sessionFee
        }
    });
};


const deleteSession = async (sessionId: string) => {
    return await prisma.tutorSession.delete({
        where: { id: sessionId },
    });
};

const getAllSessions = async () => {
    return await prisma.tutorSession.findMany({
        orderBy: { date: "desc" },
    });
};

const getSessionById = async (sessionId: string) => {
    const session = await prisma.tutorSession.findUnique({
        where: { id: sessionId },
    });

    if (!session) throw new Error("Session not found");

    return session;
};


export const teachingSessionService = {
    createSession,
    updateSession,
    deleteSession,
    getAllSessions,
    getSessionById,
};
