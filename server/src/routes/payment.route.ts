
import  { Router } from 'express';
import paymentController from "@controllers/payment/payment.controller"
const router = Router();


router.post("/validate",paymentController.postValidateTokenPayment)

export default router