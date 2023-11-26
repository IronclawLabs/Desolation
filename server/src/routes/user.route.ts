
import  { Router } from 'express';
import userController from "@controllers/user/user.controller"
const router = Router();


router.post("/create",userController.postCreateUser)

export default router