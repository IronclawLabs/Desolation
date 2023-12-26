
import  { Router } from 'express';
import paymentController from "@controllers/payment/payment.controller"

const router = Router();


router.post("/validate",paymentController.postValidateTokenPayment)
router.post("/withdraw",paymentController.postWithdrawToken)
router.get("/withdraw",paymentController.getTokenPaymentRecepit)

export default router