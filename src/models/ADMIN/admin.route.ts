import { Router } from "express"
import { AdminController } from "./admin.controller";

const adminRouter = Router()

//Category API
adminRouter.post("/create-category", AdminController.hanldecreateCategory)
adminRouter.get("/get-all-category", AdminController.handleGetAllCategoryList)
adminRouter.delete("/delete-category/:id", AdminController.handleDeleteCategory)
adminRouter.patch("/update-category/:id", AdminController.handleUpdateCategoryStatus)


//Users API
adminRouter.get("/all-users", AdminController.handleGetAllUsers)
adminRouter.delete("/delete-user/:id", AdminController.handleDeleteUser);
adminRouter.patch("/update-status/:id", AdminController.handleUpdateUserStatus)

//Tutors API
adminRouter.get("/all-tutors", AdminController.handleGetAllTutors)
adminRouter.delete("/delete-tutor/:id", AdminController.handleDeleteTutor)
adminRouter.patch("/ban-tutor/:id", AdminController.handleBanTutorProfile)
adminRouter.patch("/approve-tutor/:id", AdminController.handleApproveTutorProfile)

//Tutor Sessions API
adminRouter.delete("/delete-tutor-session/:id", AdminController.handleDeleteTutorSession)
adminRouter.get("/all-sessions", AdminController.handleGetAllSessions)




export default adminRouter;
