import { Router } from "express";
import { userController } from "./user.controller";
import { verifyRequest } from "../../middlewere/verifyRequest";
import { UserRole } from "../../generated/prisma/enums";

const userRouter = Router();

userRouter.get('/all-users'  , verifyRequest(UserRole.ADMIN) ,userController.getAllUserControle)

userRouter.get('/user/:userId', verifyRequest(UserRole.ADMIN, UserRole.TEACHER , UserRole.STUDENT), userController.getOneUserControle)


//By this route only Admin can update users all info--------------
userRouter.patch('/user-update/:userId',verifyRequest(UserRole.ADMIN), userController.updateUserControllerAdmin)

//By this route only user can update user specific info info--------------
userRouter.patch('/user/own-update/:userId', verifyRequest(UserRole.ADMIN, UserRole.TEACHER , UserRole.STUDENT) , userController.updateUserControllerUser)


userRouter.delete('/user-delete/:userId', verifyRequest(UserRole.ADMIN) ,userController.deleteUserControle)

// userRouter.get('/user/:userId', userController.getOneUserControle)

export default userRouter