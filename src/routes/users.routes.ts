import { Router } from "express";
import { createUser } from "../controllers/users.controller";

const router: Router = Router();

router.get('/', createUser);

export default router;