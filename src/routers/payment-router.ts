import { Router } from "express";
import { createPayment } from "@/controllers/payment-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { paymentSchema } from "@/schemas/payment-schemas";

const paymentsRouter = Router();
paymentsRouter
    .all('/*', authenticateToken)
    .post('/process', validateBody(paymentSchema), createPayment);

export { paymentsRouter };