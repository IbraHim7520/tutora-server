import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

interface IUser {
  name: string;
  email: string;
  role: string;
  image: string;
  isBanned: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const verifyRequest = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cookiesData = req.cookies;
      console.log(cookiesData)
      // 🔹 Get session (pass req if your auth lib requires it)
      const userSession = await auth.api.getSession({headers: req.headers as Record<string , string>});
      console.log(userSession)
      //  No session
      if (!userSession) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: No active session found",
        });
      }

      //  Banned user
      if (userSession.user.isBanned) {
        return res.status(403).json({
          success: false,
          message: "Access denied: Your account is banned",
        });
      }

      //  Prepare user data
      const userData: IUser = {
        name: userSession.user.name,
        email: userSession.user.email,
        image: userSession.user.image as string,
        isBanned: userSession.user.isBanned,
        role: userSession.user.role,
      };

      
      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(userData.role)
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You don't have permission to access this resource",
        });
      }

      req.user = userData;

      next();
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: "Authentication failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
};
