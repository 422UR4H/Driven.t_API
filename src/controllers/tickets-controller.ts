import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { ticketService } from '@/services/tickets-service';

export async function getTicketsTypes(_req: Request, res: Response): Promise<void> {
  const result = await ticketService.getTicketsTypes();
  res.send(result);
}

export async function getTickets(req: AuthenticatedRequest, res: Response): Promise<void> {
  const { userId } = req;
  const result = await ticketService.getTickets(userId);
  res.send(result);
}

export async function createTicket(req: AuthenticatedRequest, res: Response): Promise<void> {
  const { userId } = req;
  const { ticketTypeId } = req.body;
  const result = await ticketService.createTicket(userId, ticketTypeId);

  res.status(httpStatus.CREATED).send(result);
}
