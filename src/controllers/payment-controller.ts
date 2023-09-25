import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import { PaymentProcess } from '@/protocols';
import { paymentService } from '@/services/payment-service';
import { invalidDataError } from '@/errors';

export async function createPayment(req: AuthenticatedRequest, res: Response): Promise<void> {
  const { userId } = req;
  const { ticketId, cardData } = req.body as PaymentProcess;
  const result = await paymentService.create(userId, ticketId, cardData);
  res.send(result);
}

export async function getPayment(req: AuthenticatedRequest, res: Response): Promise<void> {
  const { userId } = req;
  const ticketId = parseInt(req.query.ticketId as string);
  if (typeof ticketId !== 'number' || isNaN(ticketId)) throw invalidDataError('ticketId');

  const result = await paymentService.get(userId, ticketId);
  res.send(result);
}
