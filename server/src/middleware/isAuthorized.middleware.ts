import { Request, Response, NextFunction } from "express";
import { ResponseMessage } from "@sharedtypes/enums";

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.isAuthenticated()) throw new Error(ResponseMessage.notAuthorized)
    next();
  } catch (error) {
    res.status(401);
    
    res.json({message:error.message, permission: false });
  }
};

export default isAuthorized;
