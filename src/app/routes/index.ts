import { Router } from "express";
import { userRoutes } from "../modules/auth/auth.route";

const router = Router();
const apiRoutes = [
  {
    path: "/auth",
    route: userRoutes.authRouter,
  },
  {
    path: "/users",
    route: userRoutes.userRouter,
  },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
