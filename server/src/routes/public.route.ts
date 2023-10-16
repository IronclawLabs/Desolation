
import  { Router } from 'express';
import publicController from "@controllers/public/public.controller"
const router = Router();


router.get("/",publicController.getPublicDemo)

export default router