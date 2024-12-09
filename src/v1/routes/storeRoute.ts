import { Router } from "express";
import { StoreController } from "../../controllers/storeController";
import { isLoggedIn } from "../../middlewares/authValidation";
import { validateSchema } from "../../middlewares/validateSchema";
import { orderSchema } from "../../models/schemas/orderSchema";

const app: Router = Router();
const storeController = new StoreController();

app.get("/nearest/:orderId", isLoggedIn, validateSchema(orderSchema), storeController.findNearestStore);

export default app;
