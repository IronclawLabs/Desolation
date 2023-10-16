
import  { Router } from 'express';
import adminController from "@controllers/admin/admin.controller"
const router = Router();


router.get("/",adminController.getAdmin)

export default router