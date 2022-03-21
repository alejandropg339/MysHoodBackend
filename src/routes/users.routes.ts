import { verifyConsultPersonalData } from './../middlewares/user.middlewares';
import { verifyToken } from './../middlewares/authJWT';
import { Router } from "express";
import { personalData } from "../controllers/users.controller";

const router: Router = Router();

router.get('/personal-info/:id', [verifyToken, verifyConsultPersonalData], personalData);

export default router;