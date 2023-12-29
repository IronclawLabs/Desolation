
import  { Router } from 'express';
import userController from "@controllers/user/user.controller"
import isUser from '@middleware/isUser.middleware';
import isActive from '@middleware/isActive.middleware';
import paymentRoute from "../routes/payment.route";
const router = Router();


router.put("",userController.putCreateUser)
router.get("",isUser,isActive,userController.getUser)
router.use('/payment',isUser,isActive,paymentRoute);


export default router