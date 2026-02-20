import { Router } from "express";
import { teachingSessionController } from "./tsession.controller";
import { UserRole } from "../../generated/prisma/enums";
import { verifyRequest } from "../../middlewere/verifyRequest";

const sessionRouter = Router();

sessionRouter.post("/session-create",verifyRequest(UserRole.TEACHER) ,teachingSessionController.createSession);
sessionRouter.patch("/session-update/:sessionId",verifyRequest(UserRole.TEACHER) ,teachingSessionController.updateSession);
sessionRouter.delete("/session-delete/:sessionId",verifyRequest(UserRole.ADMIN, UserRole.TEACHER) , teachingSessionController.deleteSession); // soft delete
sessionRouter.get("/sessions/all", teachingSessionController.getAllSessions);
sessionRouter.get("/session/:sessionId",  teachingSessionController.getSessionById);

export default sessionRouter;
