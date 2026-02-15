import { Router } from "express";
import { teachingSessionController } from "./tsession.controller";

const sessionRouter = Router();

sessionRouter.post("/", teachingSessionController.createSession);
sessionRouter.patch("/:sessionId", teachingSessionController.updateSession);
sessionRouter.delete("/:sessionId", teachingSessionController.deleteSession); // soft delete
sessionRouter.get("/", teachingSessionController.getAllSessions);
sessionRouter.get("/:sessionId", teachingSessionController.getSessionById);

export default sessionRouter;
