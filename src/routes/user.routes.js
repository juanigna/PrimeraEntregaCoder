import { Router } from "express";
import { userPost } from '../users/users.controller.js';

const router = Router();

router.post('/', userPost);

export default router;