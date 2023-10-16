import { Router } from "express";
import authController from "@controllers/auth/auth.controller";
import passport from "passport";
const router = Router();

router.get("/",passport.authenticate("discord-strategy"))
router.get("/redirect", passport.authenticate('discord-strategy', { 
    failureRedirect: process.env.DOMAIN,
    successRedirect: process.env.SDOMAIN
})
)
router.delete("/logout",authController.deleteAuth)

export default router;