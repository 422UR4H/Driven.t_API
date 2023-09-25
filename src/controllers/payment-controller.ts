import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import { PaymentProcess } from "@/protocols";
import { paymentService } from "@/services/payment-service";

export async function createPayment(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { userId } = req;
    const { ticketId, cardData } = req.body as PaymentProcess;
    const result = await paymentService.create(userId, ticketId, cardData);
    res.send(result);
}