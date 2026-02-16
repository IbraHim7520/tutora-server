import { Router } from "express";
import { userController } from "./user.controller";
import { verifyRequest } from "../../middlewere/verifyRequest";
import { UserRoles } from "../../Types/interface";

const userRouter = Router();

userRouter.get('/all-users' , verifyRequest("STUDENT", "ADMIN") , userController.getAllUserControle)

userRouter.get('/user/:userId', userController.getOneUserControle)


//By this route only Admin can update users all info--------------
userRouter.patch('/user-update/:userId', userController.updateUserControllerAdmin)

//By this route only user can update user specific info info--------------
userRouter.patch('/user/own-update/:userId', userController.updateUserControllerUser)


userRouter.delete('/user-delete/:userId', userController.deleteUserControle)

userRouter.get('/user/:userId', userController.getOneUserControle)

export default userRouter