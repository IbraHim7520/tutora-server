import { Request, Response } from "express";
import { userServices } from "./use.service"

const getAllUserControle = async (req: Request, res: Response) => {
    try {
        const response = await userServices.getAllUsers();
        if (response.length > 0) {
            return res.status(200).send({
                success: true,
                message: 'Users retrived successfully',
                data: response
            })
        } else {
            return res.status(200).send({
                success: true,
                message: "No User available!!",
                data: []
            })
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error!",
            data: null,
            error
        })
    }
}


const getOneUserControle = async (req: Request, res: Response) => {
    const { userId } = req.params
    try {
        const response = await userServices.getOneUser(userId as string);

        return res.status(200).send({
            success: true,
            message: 'Users retrived successfully',
            data: response
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error!",
            data: null,
            error
        })
    }
}
const updateUserControllerAdmin = async (req: Request, res: Response) => {
    const { userId } = req.params
    const updatedData = req.body;
    if (!updatedData) {
        return res.status(401).send({
            success: false,
            message: 'Minimum updated data required!!',
        })
    }
    try {
        const response = await userServices.updateUserDataAdmin(userId as string, updatedData);

        return res.status(200).send({
            success: true,
            message: 'Users updated successfully',
            data: response
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error!",
            data: null,
            error
        })
    }
}


const updateUserControllerUser = async (req: Request, res: Response) => {
    const { userId } = req.params
    const updatedData = req.body;
    if (!updatedData) {
        return res.status(401).send({
            success: false,
            message: 'Minimum updated data required!!',
        })
    }
    try {
        const response = await userServices.updateUserDataUser(userId as string, updatedData);

        return res.status(200).send({
            success: true,
            message: 'Users updated successfully',
            data: response
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error!",
            data: null,
            error
        })
    }
}

const deleteUserControle = async(req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const response = await userServices.deleteAUser(userId as string);

        return res.status(200).send({
            success: true,
            message: 'Users deleted successfully',
            data: response
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error!",
            data: null,
            error
        })
    }
}
export const userController = {
    getAllUserControle,
    getOneUserControle,
    updateUserControllerAdmin,
    updateUserControllerUser,
    deleteUserControle
}