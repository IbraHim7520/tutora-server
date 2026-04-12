import { Request, Response } from "express"
import { AdminService } from "./admin.service"


// getAllTutors: async () => {
//     return await prisma.tutor.findMany({
//         where: {
//             user: {
//                 role: UserRole.TEACHER
//             }
//         },
//         include: {
//             user: {
//                 select: {
//                     email: true,
//                     status: true,
//                     createdAt: true,
//                     image: true
//                 }
//             }
//         }
//     })
// },


//     deleteTutor: async (tutorId: string) => {
//         const isTutor = await prisma.tutor.findUnique({ where: { id: tutorId } });
//         if (!isTutor) throw new Error("Tutor not found");
//         const result = await prisma.$transaction(async (tx) => {
//             const deleteTutor = await tx.tutor.delete({
//                 where: {
//                     id: tutorId
//                 }
//             })
//             const userId = deleteTutor.userId;
//             const updateUserStat = await tx.user.update({
//                 where: {
//                     id: userId
//                 },
//                 data: {
//                     status: UserStatus.DELETED
//                 }
//             })
//             return {
//                 deleteTutor,
//                 updateUserStat
//             }
//         })
//         return result;
//     },

//         banTutorProfile: async (tutorId: string) => {
//             const isTutor = await prisma.tutor.findUnique({ where: { id: tutorId } });
//             if (!isTutor) throw new Error("Tutor not found");
//             const result = await prisma.tutor.update({
//                 where: {
//                     id: tutorId
//                 },
//                 data: {
//                     isBanned: isTutor.isBanned ? false : true,
//                     status: isTutor.isBanned ? UserStatus.ACTIVE : UserStatus.BLOCKED
//                 }
//             })
//             return result;
//         },


//             deleteTutorSessions: async (sessionId: string) => {
//                 const isSession = await prisma.tutorSession.findUnique({ where: { id: sessionId } });
//                 if (!isSession) throw new Error("Session not found");
//                 const deleteSession = await prisma.tutorSession.delete({
//                     where: {
//                         id: sessionId
//                     }
//                 })
//                 return deleteSession;
//             },


//                 getAllSessions: async () => {
//                     return await prisma.tutorSession.findMany({
//                         include: {
//                             tutor: {
//                                 select: {
//                                     user: {
//                                         select: {
//                                             name: true,
//                                             email: true,
//                                             image: true
//                                         }
//                                     }
//                                 }
//                             }
//                         }
//                     })
//                 }


const hanldecreateCategory = async(
    req:Request,
    res:Response
)=>{
    const categoryData = req.body;
    try {
        const data = await AdminService.createCategory(categoryData)
        return res.status(200).json({
            success:true,
            message:"Category created successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to create category",
            error
        })
    }
}

const handleGetAllCategoryList = async(
    req:Request,
    res:Response
)=>{
    try {
        const data = await AdminService.getAllCategoryList()
        return res.status(200).json({
            success:true,
            message:"Category list fetched successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to fetch category list",
            error
        })
    }
}

const handleDeleteCategory = async(
    req:Request,
    res:Response
)=>{
    const {id} = req.params;
    try {
        const data = await AdminService.deleteCategory(id as string)
        return res.status(200).json({
            success:true,
            message:"Category deleted successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to delete category",
            error
        })
    }
}

const handleUpdateCategoryStatus = async(
    req:Request,
    res:Response
)=>{
    const {id} = req.params;
    const updateData = req.body;
    try {
        const data = await AdminService.updateCategory(id as string, updateData)
        return res.status(200).json({
            success:true,
            message:"Category status updated successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to update category status",
            error
        })
    }
}

const handleUpdateUserStatus = async(
    req:Request,
    res:Response
)=>{
    const {id} = req.params;
    const updateData = req.body;
    try {
        const data = await AdminService.updateUserStatus(id as string, updateData)
        return res.status(200).json({
            success:true,
            message:"User status updated successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to update user status",
            error
        })
    }
}


const handleGetAllUsers = async(
    req:Request,
    res:Response
)=>{
    const myEmail = req.user?.email as string
    try {
        const data = await AdminService.getAllUsers(myEmail)
        return res.status(200).json({
            success:true,
            message:"Users list fetched successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to fetch users list",
            error
        })
    }
}

const handleDeleteUser = async(
    req:Request,
    res:Response
)=>{
    const {id} = req.params;
    try {
        const data = await AdminService.deleteUsers(id as string)
        return res.status(200).json({
            success:true,
            message:"User deleted successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to delete user",
            error
        })
    }
}

const handleGetAllTutors = async(
    req:Request,
    res:Response
)=>{
    
    try {
        const data = await AdminService.getAllTutors()
        return res.status(200).json({
            success:true,
            message:"Tutors list fetched successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to fetch tutors list",
            error
        })
    }
}

const handleDeleteTutor = async(
    req:Request,
    res:Response
)=>{
    const {id} = req.params;
    try {
        const data = await AdminService.deleteTutor(id as string)
        return res.status(200).json({
            success:true,
            message:"Tutor deleted successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to delete tutor",
            error
        })
    }
}

const handleBanTutorProfile = async(
    req:Request,
    res:Response
)=>{
    const {id} = req.params;
    const ban = req.body
    console.log(ban)
    try {
        const data = await AdminService.banTutorProfile(id as string , ban)
        return res.status(200).json({
            success:true,
            message:"Tutor profile banned successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to ban tutor profile",
            error
        })
    }
}

const handleDeleteTutorSession = async(
    req:Request,
    res:Response
)=>{
    const {id} = req.params;
    try {
        const data = await AdminService.deleteTutorSessions(id as string)
        return res.status(200).json({
            success:true,
            message:"Tutor session deleted successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to delete tutor session",
            error
        })
    }
}

const handleGetAllSessions = async(
    req:Request,
    res:Response
)=>{
    try {
        const data = await AdminService.getAllSessions()
        return res.status(200).json({
            success:true,
            message:"Sessions list fetched successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to fetch sessions list",
            error
        })
    }
}

const handleApproveTutorProfile = async(
    req:Request,
    res:Response
)=>{
    const {id} = req.params;
    try {
        const data = await AdminService.approveTutorProfile(id as string)
        return res.status(200).json({
            success:true,
            message:"Tutor profile approved successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to approve tutor profile",
            error
        })
    }
}




export const AdminController = {
    hanldecreateCategory,
    handleGetAllCategoryList,
    handleDeleteCategory,
    handleUpdateCategoryStatus,
    handleGetAllUsers,
    handleDeleteUser,
    handleGetAllTutors,
    handleDeleteTutor,
    handleBanTutorProfile,
    handleDeleteTutorSession,
    handleGetAllSessions,
    handleApproveTutorProfile,
    handleUpdateUserStatus
}
