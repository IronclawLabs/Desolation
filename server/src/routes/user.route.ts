
import  { Router } from 'express';
import userController from "@controllers/user/user.controller"
import isUser from '@middleware/isUser.middleware';
import isAuthorized from '@middleware/isAuthorized.middleware';
import isActive from '@middleware/isActive.middleware';
import paymentRoute from "../routes/payment.route";
const router = Router();


router.put("",userController.putCreateUser)
router.get("",isAuthorized,isUser,isActive,userController.getUser)
router.use('/payment',isAuthorized,isUser,isActive,paymentRoute);


export default router