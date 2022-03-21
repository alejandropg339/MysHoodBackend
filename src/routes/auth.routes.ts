import { Router } from "express";
import { signIn } from "../controllers/auth/auth.controller";
import { createUser } from "../controllers/users.controller";


const router: Router = Router();

router.post('/signin', signIn);
router.post('/signUp', createUser);

export default router;