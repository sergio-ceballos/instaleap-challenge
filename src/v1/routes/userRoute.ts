import { Router } from "express";

import { UserController } from "../../controllers/userController";
import { validateSchema } from "../../middlewares/validateSchema";
import { loginSchema } from "../../models/schemas/userSchema";

const app: Router = Router();
const userController = new UserController();

app.post("/login", validateSchema(loginSchema), userController.login);

export default app;
