import { prisma } from "../../lib/prisma";
import { ITeachingSessionData, ITeachingSessionDataUpdate } from "../../Types/interface";


const createSession = async (data: ITeachingSessionData) => {
    const formatedDate = new Date(data.date);
    const fromDateTime = new Date(`${data.date}T${data.fromTime}:00`);
    const toDateTime = new Date(`${data.date}T${data.toTime}:00`);
    data.date = formatedDate;
    data.fromTime = fromDateTime;
    data.toTime = toDateTime;

    const userId = data.tutorId;
    const tutorData = await prisma.tutor.findFirst({
        where: {
            user: {
                id: userId
            }
        }
    })
    if (!tutorData) throw new Error("You are not registered as tutor!!");
    data.tutorId = tutorData.id;
    return await prisma.tutorSession.create({
        data: {
            title: data.title,
            description: data.description,
            date: data.date,
            fromTime: data.fromTime,
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
        data: {
            title: updatedData.title,
            description: updatedData.description,
            date: updatedData.date,
            fromTime: updatedData.fromTime,
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
        include: {
            category: {
                select: {
                    id: true,
                    title: true,
                    description: true
                }
            },
            tutor: {
                select: {
                    experience: true,
                    designation: true,
                    degree: true,
                    isBanned: true,
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true
                        }
                    }
                }
            }
        },
        orderBy: { date: "desc" },
    });
};

const getSessionById = async (sessionId: string) => {
    const session = await prisma.tutorSession.findUnique({
        include: {
            category: {
                select: {
                    id: true,
                    title: true,
                    description: true
                }
            },
            tutor: {
                select: {
                    degree: true,
                    designation: true,
                    isBanned: true,
                    experience: true,
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true
                        }
                    }
                }
            }
        },
        where: { id: sessionId },
    });

    if (!session) throw new Error("Session not found");

    return session;
};

const getSessionsByTutorId = async (tutorEmail: string) => {
    try {
        const userData = await prisma.user.findUnique({
            where: {
                email: tutorEmail
            },
            include: {
                tutors: {
                    select: {
                        id: true
                    }
                }
            }
        })
        if (!userData) {
            throw new Error("You're Unauthorized!!");
        }

        const tutorId = userData?.tutors?.id;
        if (!tutorId) throw new Error("Invalid Tutor Id!!");

        const sessionsData = await prisma.tutorSession.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                tutorId: tutorId,
            },
            include: {
                category: {
                    select: {
                        title: true,
                        id: true
                    }
                },
                bookings: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                email: true,
                                name: true,
                                image: true,
                                status: true
                            }
                        }
                    }
                }
            }
        })
        return sessionsData;
    } catch (error) {
        throw error
    }
}
export const teachingSessionService = {
    createSession,
    updateSession,
    deleteSession,
    getAllSessions,
    getSessionById,
    getSessionsByTutorId
};
