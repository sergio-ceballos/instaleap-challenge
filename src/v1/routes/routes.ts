import { Router } from "express";

import userRoutes from './userRoute';
import storeRoutes from './storeRoute';

const app: Router = Router();

app.use('/user', userRoutes);
app.use('/stores', storeRoutes);

app.use((_, res) => {
    res.sendStatus(404);
});

export default app;