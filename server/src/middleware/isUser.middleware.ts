import { Response, NextFunction } from "express";
import { AccountType, ResponseMessage } from "@sharedtypes/enums";
import passport from "passport";

const isUser = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  // Use passport.authenticate to check authentication
  
  passport.authenticate("jwt", { session: false }, (error: any, user: any) => {
    try {

      if (error || !user) {
        // Authentication failed
        throw new Error("Authentication failed");
      }
      // Authentication succeeded
      // databaseden clickeri çek eğer yoksa databasede error at varsa assign et
      req.dbUser = user;
      next();
    } catch (error) {
      res.status(401);
      res.json({ message: error.message, permission: false });
    }
  })(req, res, next); // Call passport.authenticate as a middleware
}

export default isUser