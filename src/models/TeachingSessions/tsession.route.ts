import { Router } from "express";
import { teachingSessionController } from "./tsession.controller";

const sessionRouter = Router();

sessionRouter.post("/session-create", teachingSessionController.createSession);
sessionRouter.patch("/session-update/:sessionId", teachingSessionController.updateSession);
sessionRouter.delete("/session-delete/:sessionId", teachingSessionController.deleteSession); // soft delete
sessionRouter.get("/sessions/all", teachingSessionController.getAllSessions);
sessionRouter.get("/session/:sessionId", teachingSessionController.getSessionById);

export default sessionRouter;
