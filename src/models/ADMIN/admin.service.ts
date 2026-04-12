import { RequestStatus, UserRole, UserStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IAdminCreateCategory, IAdminUpdateCategoryStatus, IAdminUpdateUserStatus } from "./admin.interface";

export const AdminService = {
    createCategory: async(catData:IAdminCreateCategory)=>{
        return await prisma.category.create({
            data:{
                title: catData.title,
                description:catData.description,
            }
        })
    },

    getAllCategoryList: async()=>{
        return await prisma.category.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
    },

    deleteCategory: async(id:string)=>{
        const isCat = await prisma.category.findUnique({where: {id:id}});
        if(!isCat) throw new Error("Category not found");
        return await prisma.category.delete({
            where:{
                id:id
            }
        })
    },

    updateCategory: async(id:string, updateData:IAdminUpdateCategoryStatus)=>{
     const isCat = await prisma.category.findUnique({where: {id:id}});
     if(!isCat) throw new Error("Category not found");
     return await prisma.category.update({
        where:{
            id:id
        },
        data:{
            status:updateData.status
        }
     })
    },


    getAllUsers: async(myEmail:string)=>{
        return await prisma.user.findMany({
            // where:{
            //     NOT:{
            //         email:myEmail
            //     }
            // },
            orderBy: {
                createdAt: "desc"
            }
        });
    },


    updateUserStatus: async(userId:string, updateData:IAdminUpdateUserStatus)=>{
        const isUser = await prisma.user.findUnique({where: {id:userId}});
        if(!isUser) throw new Error("User not found");
        const result = await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                status:updateData.status
            }
        })
        return result;
    },

    deleteUsers: async(userId:string)=>{
        const isUser = await prisma.user.findUnique({where: {id:userId}});
        if(!isUser) throw new Error("User not found");
        const deleteUser = await prisma.user.update({
            where:{
                id: userId
            },
            data:{
                status: UserStatus.DELETED
            }
        })
        return deleteUser;
    },

    tutorRequestStatus: async(tutorId:string , status: RequestStatus)=>{
        const isTutor = await prisma.tutor.findUnique({where: {id:tutorId}});
        if(!isTutor) throw new Error("Tutor not found");
        const result = await prisma.$transaction(async(tx)=>{
            const updateTutorStatus = await tx.tutor.update({
                where:{
                    id: tutorId
                },
                data:{
                    status: RequestStatus.APPROVED
                }
            })
            const userId = updateTutorStatus.userId;
            const updateUserStat = await tx.user.update({
                where:{
                    id:userId
                },
                data:{
                    role: UserRole.TEACHER 
                }
            })
            return {
                updateTutorStatus,
                updateUserStat
            }
        })
        return result;
    },

    approveTutorProfile: async(tutorId:string)=>{
        const isTutor = await prisma.tutor.findUnique({where: {id:tutorId}});
        if(!isTutor) throw new Error("Tutor not found");
        const result = await prisma.$transaction(async(tx)=>{
            const updateTutorStatus = await tx.tutor.update({
                where:{
                    id: tutorId
                },
                data:{
                    status: RequestStatus.APPROVED
                }
            })
            const userId = updateTutorStatus.userId;
            const updateUserStat = await tx.user.update({
                where:{
                    id:userId
                },
                data:{
                    role: UserRole.TEACHER 
                }
            })
            return {
                updateTutorStatus,
                updateUserStat
            }
        })
        return result;
    },

    getAllTutors:async()=>{
        return await prisma.tutor.findMany({
            include:{
                user:{
                    select:{
                        id:true,
                        name:true,
                        email:true,
                        status:true,
                        createdAt:true,
                        image:true
                    }
                }
            }
        })
    },


    deleteTutor:async(tutorId:string)=>{
        const isTutor = await prisma.tutor.findUnique({where: {id:tutorId}});
        if(!isTutor) throw new Error("Tutor not found");
        const result = await prisma.$transaction(async(tx)=>{
            const deleteTutor = await tx.tutor.delete({
                where:{
                    id:tutorId
                }
            })
            const userId = deleteTutor.userId;
            const updateUserStat = await tx.user.update({
                where:{
                    id:userId
                },
                data:{
                    status:UserStatus.DELETED
                }
            })
            return {
                deleteTutor,
                updateUserStat
            }
        })
        return result;
    },

    banTutorProfile:async(tutorId:string, ban:{isBanned:boolean})=>{
        const isTutor = await prisma.tutor.findUnique({where: {id:tutorId}});
        if(!isTutor) throw new Error("Tutor not found");
        const result = await prisma.tutor.update({
            where:{
                id:tutorId
            },
            data:{
                isBanned: ban.isBanned ? false : true
            }
        })
        
        return result;
    },


    deleteTutorSessions:async(sessionId:string)=>{
        const isSession = await prisma.tutorSession.findUnique({where: {id:sessionId}});
        if(!isSession) throw new Error("Session not found");
        const deleteSession = await prisma.tutorSession.delete({
            where:{
                id:sessionId
            }
        })
        return deleteSession;
    },


    getAllSessions:async()=>{
        return await prisma.tutorSession.findMany({
            include:{
                tutor:{
                    select:{
                        user:{
                            select:{
                                name:true,
                                email:true,
                                image:true
                            }
                        }
                    }
                }
            }
        })
    }



    
}
