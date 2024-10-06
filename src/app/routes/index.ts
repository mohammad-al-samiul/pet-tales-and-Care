import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes";

const router = Router();
const apiRoutes = [{ path: "/auth", route: authRouter }];

apiRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
