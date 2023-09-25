import { Router } from "express";
import { createPayment, getPayment } from "@/controllers/payment-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { paymentSchema } from "@/schemas/payment-schemas";
import { PaymentProcess } from "@/protocols";

const paymentsRouter = Router();
paymentsRouter
    .all('/*', authenticateToken)
    .get('/', getPayment)
    .post('/process', validateBody<PaymentProcess>(paymentSchema), createPayment);

export { paymentsRouter };