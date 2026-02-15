import { prisma } from "../../lib/prisma"
import { IUpdateUserAdmin, IUpdateUserUser } from "../../Types/interface";

const getAllUsers = async () => {
    return await prisma.user.findMany();
}

const getOneUser = async (userId: string) => {
    return await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}

const updateUserDataAdmin = async (userId: string, userData: IUpdateUserAdmin) => {
    const isUserExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!isUserExists) throw new Error("User is not Exists")
    return await prisma.user.update({
        where: { id: userId },
        data: {
            image: userData.image,
            role: userData.role,
            email: userData.email,
            isBanned: userData.isBanner
        }
    })
}

const updateUserDataUser = async (userId: string, userData: IUpdateUserUser) => {
    const isUserExists = await prisma.user.findUnique({ where: { id: userId, isBanned: false } });
    if (!isUserExists) throw new Error("User is not Exists")
    return await prisma.user.update({
        where: { id: userId },
        data: {
            image: userData.image,
            email: userData.email,
        }
    })
}

const deleteAUser = async (userId: string) => {
    const isUserExists = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!isUserExists) {
        throw new Error("User does not exist");
    }

    const result = await prisma.$transaction(async (tx) => {
        const updatedUser = await tx.user.update({
            where: { id: userId },
            data: { isBanned: true },
        });

        await tx.session.deleteMany({
            where: { userId: userId },
        });

        return updatedUser;
    });

    return result;
};

export const userServices = {
    getAllUsers,
    getOneUser,
    updateUserDataAdmin,
    updateUserDataUser,
    deleteAUser
}